# ll-role-challenge

was not able to complete due to time constraits:
- was working with a fresh install laptop and had to setup everything from scratch

# Implementation Plan

## APIS
- GET /appointments
    - list all created appointments
- POST /appointments
    - create new appointments
    - input is appointment details (datetime & user details & slot count request)
    - will check if within working day/hour (using momentjs)
    - check if existing appointment
        - if no create fresh appointment with 5 - slot count request
        - if yes, check if remaining slot count is valid
            if yes, update appointment
            if no, throw error

## Stack choices

- typescript
- express js (familiarity reasons)
- postgresql (wanted to make use of relational database, due to the customer-appointment relations. possibility of expanding to many-many relations for multiple appointments for same customer within the week)
- typeorm (familiarity reasons & typescript support)
    