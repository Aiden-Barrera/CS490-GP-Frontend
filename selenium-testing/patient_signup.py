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
patient_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[1]"
click_button(patient_button_XPATH)

# Enter First Name
first_name_XPATH = "//*[@id=\"patientsignupform_First_Name\"]"
enter_input(first_name_XPATH, fake.first_name())

# Enter Last Name
last_name_XPATH = "//*[@id=\"patientsignupform_Last_Name\"]"
enter_input(last_name_XPATH, fake.last_name())

# Enter Email
email_XPATH = "//*[@id=\"patientsignupform_Email\"]"
enter_input(email_XPATH, fake.email())

# Enter Phone Number
phone_number_XPATH = "//*[@id=\"patientsignupform_Phone\"]"
enter_input(phone_number_XPATH, fake.numerify(text="###-###-####"))

# Enter Address
address_XPATH = "//*[@id=\"patientsignupform_Address\"]"
address = f"{fake.building_number()} {fake.street_name().split(' ')[0]} {fake.street_suffix()}"
enter_input(address_XPATH, address)

# Enter Zip Code
zip_code_XPATH = "//*[@id=\"patientsignupform_Zip\"]/input"
enter_input(zip_code_XPATH, 88010)

# Click Search Nearest Pharmacies button
search_nearest_pharmacy_button_XPATH = "//*[@id=\"patientsignupform_Zip\"]/button"
click_button(search_nearest_pharmacy_button_XPATH)

# Click Nearest Pharmacy dropdown
search_nearest_pharmacy_dropdown_XPATH = "//*[@id=\"patientsignupform_Pharm_ID\"]"
click_button(search_nearest_pharmacy_dropdown_XPATH)

# Select 1st Nearest Pharmacy
nearest_pharmacy_XPATH = "/html/body/div[4]/div/div/div[2]/div/div/div/div[1]/div"
click_button(nearest_pharmacy_XPATH)

# Enter Password
password_XPATH = "//*[@id=\"patientsignupform_PW\"]"
enter_input(password_XPATH, fake.password())

# Click Preliminary Form button
preliminary_form_button_XPATH = "//*[@id=\"patientsignupform\"]/div[9]/div/div/div/div/button"
click_button(preliminary_form_button_XPATH)

# Click Back Pain checkbox
back_pain_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[1]/td[1]/div[1]/label/span[1]/input"
click_button(back_pain_checkbox_XPATH)

# Click Blurred Vision checkbox
blurred_vision_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[1]/td[2]/div[1]/label/span[1]/input"
click_button(blurred_vision_checkbox_XPATH)

# Click Memory Loss checkbox
memory_loss_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[1]/td[3]/div[4]/label/span[1]/input"
click_button(memory_loss_checkbox_XPATH)

# Click Callus checkbox
callus_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[3]/td[1]/div[3]/label/span[1]/input"
click_button(callus_checkbox_XPATH)

# Click Asthma checkbox
asthma_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[3]/td[2]/div[3]/label/span[1]/input"
click_button(asthma_checkbox_XPATH)

# Click Callus checkbox
irregular_heart_beat_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[3]/td[3]/div[2]/label/span[1]/input"
click_button(irregular_heart_beat_checkbox_XPATH)

# Click Submit Preliminary Form
submit_preliminary_form_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[2]/div/div/div/div/button"
click_button(submit_preliminary_form_XPATH)

# Click Create an account submission button
create_an_account_submission_button_XPATH = "//*[@id=\"patientsignupform\"]/div[10]/div/div/div/div/button"
click_button(create_an_account_submission_button_XPATH)

time.sleep(5)
driver.quit()