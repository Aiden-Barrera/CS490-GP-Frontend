from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains
import time
from faker import Faker

service = Service(excutable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)
fake = Faker()
time_to_wait_between_inputs = 0.2

driver.get("http://localhost:5173/") # Open Primewell Cliniic Website

def click_button(XPATH_LINK):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    ActionChains(driver).scroll_to_element(element).perform()
    element.click()
    time.sleep(time_to_wait_between_inputs)

def enter_input(XPATH_LINK, input):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    ActionChains(driver).scroll_to_element(element).perform()
    element.clear()
    element.send_keys(input)
    time.sleep(time_to_wait_between_inputs)

# Click Create account button
create_account_button_XPATH = "//*[@id=\"root\"]/div/div/header/button[2]"
click_button(create_account_button_XPATH)

# Click Patient button
doctor_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[2]"
click_button(doctor_button_XPATH)

# Enter First Name
first_name_XPATH = "//*[@id=\"doctorsignupform_First_Name\"]"
enter_input(first_name_XPATH, fake.first_name())

# Enter Last Name
last_name_XPATH = "//*[@id=\"doctorsignupform_Last_Name\"]"
enter_input(last_name_XPATH, fake.last_name())

# Enter Email
email_XPATH = "//*[@id=\"doctorsignupform_Email\"]"
enter_input(email_XPATH, fake.email())

# Enter Phone Number
phone_number_XPATH = "//*[@id=\"doctorsignupform_Phone\"]"
enter_input(phone_number_XPATH, fake.numerify(text="###-###-####"))

# Enter Specialty
specialty_XPATH = "//*[@id=\"doctorsignupform_Specialty\"]"
enter_input(specialty_XPATH, "Heart Surgery")

# Enter Doctor License Number
doctor_license_number_XPATH = "//*[@id=\"doctorsignupform_License_Serial\"]"
enter_input(doctor_license_number_XPATH, fake.numerify(text="###-##-######"))

# Enter Password
password_XPATH = "//*[@id=\"doctorsignupform_PW\"]"
enter_input(password_XPATH, fake.password())

# Click Work Hours Form button
work_hours_form_button_XPATH = "//*[@id=\"doctorsignupform\"]/div[8]/div/div/div/div/button"
click_button(work_hours_form_button_XPATH)

# Click Mon box
mon_box_XPATH = "//*[@id=\"Mon\"]"
click_button(mon_box_XPATH)

# Click Tue Box
tue_box_XPATH = "//*[@id=\"Tue\"]"
click_button(tue_box_XPATH)

# Click Wed Box
wed_box_XPATH = "//*[@id=\"Wed\"]"
click_button(wed_box_XPATH)

# Click Thu Box
thu_box_XPATH = "//*[@id=\"Thu\"]"
click_button(thu_box_XPATH)

# Enter First Shift
first_shift_XPATH = "//*[@id=\"firstShift\"]"
enter_input(first_shift_XPATH, "9:00-12:00")

# Enter Second Shift
second_shift_XPATH = "//*[@id=\"secondShift\"]"
enter_input(second_shift_XPATH, "1:00-5:00")

# Click Submit Work Hours Form
submit_work_hours_form_XPATH = "/html/body/div[4]/div/div[2]/div/div[1]/div/div/div/div/form/div[4]/div/div/div/div/button"
click_button(submit_work_hours_form_XPATH)

# Click Create an account submission button
create_an_account_submission_button_XPATH = "//*[@id=\"doctorsignupform\"]/div[9]/div/div/div/div/button"
click_button(create_an_account_submission_button_XPATH)

time.sleep(5)
# driver.quit()