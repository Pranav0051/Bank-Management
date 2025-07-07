package com.demo.controller;

import com.demo.dao.employeeDao;
import com.demo.model.Employee;
import com.demo.model.EmployeeDTO;
import com.demo.model.EmployeeDTOResponse;
import com.demo.service.emailServices;
import com.demo.service.employeeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/Employee")
public class employeeController {

    @Autowired
    private employeeService employeeService;

    @Autowired
    private emailServices services;

    @Autowired
    private employeeDao employeeDao;
    @PostMapping(value="/Save",consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> save(@ModelAttribute EmployeeDTO employeeDTO)
    {
        try
        {
            Employee employee = getEmployee(employeeDTO);

            employeeService.save(employee);

            services.sendEmployeeCredentials(
                employeeDTO.getEmail(),employeeDTO.getLoginId(),employeeDTO.getPassword()
            );

            return  new ResponseEntity<>(HttpStatus.OK);
        }catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    private static Employee getEmployee(EmployeeDTO employeeDTO) throws IOException {
        Employee employee=new Employee();
        employee.setFirstname(employeeDTO.getFirstname());
        employee.setLastname(employeeDTO.getLastname());
        employee.setEmail(employeeDTO.getEmail());
        employee.setLoginId(employeeDTO.getLoginId());
        employee.setPhone(employeeDTO.getPhone());
        employee.setPassword(employeeDTO.getPassword());
        employee.setAddress(employeeDTO.getAddress());

        employee.setPhoto(employeeDTO.getPhoto().getBytes());
        return employee;
    }

    @GetMapping("/check-email")
    public ResponseEntity<?> checkEmail(@RequestParam String email) {
        boolean exists = employeeDao.existsByEmail(email);
        return ResponseEntity.ok(Map.of("available", !exists));
    }

    @GetMapping("/check-loginId")
    public ResponseEntity<?> checkLoginId(@RequestParam String loginId) {
        boolean exists = employeeDao.existsByLoginId(loginId);
        return ResponseEntity.ok(Map.of("available", !exists));
    }


    @GetMapping("/GetAll")
    public ResponseEntity<List<EmployeeDTOResponse>> getAll() {
        List<Employee> employees=employeeService.findAll();
        if(employees!=null&&!employees.isEmpty()) {
            List<EmployeeDTOResponse> dtoList = employees.stream()
                    .map(EmployeeDTOResponse::new)
                    .toList();
            return ResponseEntity.ok(dtoList);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping("/Delete/{loginId}")
    public ResponseEntity<?> deleteByEid(@PathVariable String loginId){
        if(loginId!=null&& !loginId.isEmpty()) {
            employeeService.deleteByLoginId(loginId);
            return new ResponseEntity<>(HttpStatus.OK);
        }
        return  new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @PutMapping("/Update")
        public ResponseEntity<?> findByLoginId(@ModelAttribute EmployeeDTO employeeDTO){
            if(employeeDTO.getLoginId() !=null) {
                try {
                    Employee employee =employeeService.findByLoginId(employeeDTO.getLoginId());
                    if(employee== null){
                        return new ResponseEntity<>("Empolyee not Found",HttpStatus.NOT_FOUND);
                    }
                    employee.setFirstname(employeeDTO.getFirstname());
                    employee.setLastname(employeeDTO.getLastname());
                    employee.setEmail(employeeDTO.getEmail());
                    employee.setLoginId(employeeDTO.getLoginId());
                    employee.setPhone(employeeDTO.getPhone());
                    employee.setPassword(employeeDTO.getPassword());
                    employee.setAddress(employeeDTO.getAddress());

                    if (employeeDTO.getPhoto() != null && !employeeDTO.getPhoto().isEmpty()) {
                        employee.setPhoto(employeeDTO.getPhoto().getBytes());
                    }

                    employeeService.save(employee);

                    return new ResponseEntity<>(HttpStatus.OK);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
    }
}



