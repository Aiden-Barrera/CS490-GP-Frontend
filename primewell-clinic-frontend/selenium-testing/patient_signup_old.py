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
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, create_account_button_XPATH)))
# create_account_button = driver.find_element(By.XPATH, create_account_button_XPATH)
# create_account_button.click()
# time.sleep(time_to_wait_between_inputs)

# Click Patient button
patient_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[1]"
click_button(patient_button_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, patient_button_XPATH)))
# patient_button = driver.find_element(By.XPATH, patient_button_XPATH)
# patient_button.click()
# time.sleep(time_to_wait_between_inputs)

# Enter First Name
first_name_XPATH = "//*[@id=\"patientsignupform_First_Name\"]"
enter_input(first_name_XPATH, fake.first_name())
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, first_name_XPATH)))
# first_name = driver.find_element(By.XPATH, first_name_XPATH)
# first_name.clear()
# first_name.send_keys(fake.first_name())
# time.sleep(time_to_wait_between_inputs)

# Enter Last Name
last_name_XPATH = "//*[@id=\"patientsignupform_Last_Name\"]"
enter_input(last_name_XPATH, fake.last_name())
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, last_name_XPATH)))
# last_name = driver.find_element(By.XPATH, last_name_XPATH)
# last_name.clear()
# last_name.send_keys(fake.last_name())
# time.sleep(time_to_wait_between_inputs)

# Enter Email
email_XPATH = "//*[@id=\"patientsignupform_Email\"]"
enter_input(email_XPATH, fake.email())
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, email_XPATH)))
# email = driver.find_element(By.XPATH, email_XPATH)
# email.clear()
# email.send_keys(fake.email())
# time.sleep(time_to_wait_between_inputs)

# Enter Phone Number
phone_number_XPATH = "//*[@id=\"patientsignupform_Phone\"]"
enter_input(phone_number_XPATH, fake.numerify(text="###-###-####"))
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, phone_number_XPATH)))
# phone_number = driver.find_element(By.XPATH, phone_number_XPATH)
# phone_number.clear()
# phone_number.send_keys(fake.numerify(text="###-###-####"))
# time.sleep(time_to_wait_between_inputs)

# Enter Address
address_XPATH = "//*[@id=\"patientsignupform_Address\"]"
fake_address = f"{fake.building_number()} {fake.street_name().split(' ')[0]} {fake.street_suffix()}"
enter_input(address_XPATH, fake_address)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, address_XPATH)))
# address = driver.find_element(By.XPATH, address_XPATH)
# address.clear()
# print(fake_address)
# address.send_keys(fake_address)
# time.sleep(time_to_wait_between_inputs)

# Enter Zip Code
zip_code_XPATH = "//*[@id=\"patientsignupform_Zip\"]/input"
enter_input(zip_code_XPATH, 88010)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, zip_code_XPATH)))
# zip_code = driver.find_element(By.XPATH, zip_code_XPATH)
# zip_code.clear()
# # zip_code.send_keys(fake.numerify(text="#####"))
# zip_code.send_keys(88010)
# time.sleep(time_to_wait_between_inputs)

# Click Search Nearest Pharmacies button
search_nearest_pharmacy_button_XPATH = "//*[@id=\"patientsignupform_Zip\"]/button"
click_button(search_nearest_pharmacy_button_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, search_nearest_pharmacy_button_XPATH)))
# search_nearest_pharmacy_button = driver.find_element(By.XPATH, search_nearest_pharmacy_button_XPATH)
# search_nearest_pharmacy_button.click()
# time.sleep(time_to_wait_between_inputs)

# Click Nearest Pharmacy dropdown
search_nearest_pharmacy_dropdown_XPATH = "//*[@id=\"patientsignupform_Pharm_ID\"]"
click_button(search_nearest_pharmacy_dropdown_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, search_nearest_pharmacy_dropdown_XPATH)))
# search_nearest_pharmacy_dropdown = driver.find_element(By.XPATH, search_nearest_pharmacy_dropdown_XPATH)
# search_nearest_pharmacy_dropdown.click()
# time.sleep(time_to_wait_between_inputs)

# Select 1st Nearest Pharmacy
nearest_pharmacy_XPATH = "/html/body/div[4]/div/div/div[2]/div/div/div/div[1]/div"
click_button(nearest_pharmacy_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, nearest_pharmacy_XPATH)))
# nearest_pharmacy = driver.find_element(By.XPATH, nearest_pharmacy_XPATH)
# nearest_pharmacy.click()
# time.sleep(time_to_wait_between_inputs)

# Enter Password
password_XPATH = "//*[@id=\"patientsignupform_PW\"]"
enter_input(password_XPATH, fake.password())
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, password_XPATH)))
# password = driver.find_element(By.XPATH, password_XPATH)
# password.clear()
# password.send_keys(fake.password())
# time.sleep(time_to_wait_between_inputs)

# Click Preliminary Form button
preliminary_form_button_XPATH = "//*[@id=\"patientsignupform\"]/div[9]/div/div/div/div/button"
click_button(preliminary_form_button_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, preliminary_form_button_XPATH)))
# preliminary_form_button = driver.find_element(By.XPATH, preliminary_form_button_XPATH)
# preliminary_form_button.click()
# time.sleep(time_to_wait_between_inputs)

# Click Back Pain checkbox
back_pain_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[1]/td[1]/div[1]/label/span[1]/input"
click_button(back_pain_checkbox_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, back_pain_checkbox_XPATH)))
# back_pain_checkbox = driver.find_element(By.XPATH, back_pain_checkbox_XPATH)
# back_pain_checkbox.click()
# time.sleep(time_to_wait_between_inputs)

# Click Blurred Vision checkbox
blurred_vision_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[1]/td[2]/div[1]/label/span[1]/input"
click_button(blurred_vision_checkbox_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, blurred_vision_checkbox_XPATH)))
# blurred_vision_checkbox = driver.find_element(By.XPATH, blurred_vision_checkbox_XPATH)
# blurred_vision_checkbox.click()
# time.sleep(time_to_wait_between_inputs)

# Click Memory Loss checkbox
memory_loss_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[1]/td[3]/div[4]/label/span[1]/input"
click_button(memory_loss_checkbox_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, memory_loss_checkbox_XPATH)))
# memory_loss = driver.find_element(By.XPATH, memory_loss_checkbox_XPATH)
# memory_loss.click()
# time.sleep(time_to_wait_between_inputs)

# Click Callus checkbox
callus_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[3]/td[1]/div[3]/label/span[1]/input"
click_button(callus_checkbox_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, callus_checkbox_XPATH)))
# callus_checkbox = driver.find_element(By.XPATH, callus_checkbox_XPATH)
# callus_checkbox.click()
# time.sleep(time_to_wait_between_inputs)

# Click Asthma checkbox
asthma_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[3]/td[2]/div[3]/label/span[1]/input"
click_button(asthma_checkbox_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, asthma_checkbox_XPATH)))
# asthma_checkbox = driver.find_element(By.XPATH, asthma_checkbox_XPATH)
# asthma_checkbox.click()
# time.sleep(time_to_wait_between_inputs)

# Click Callus checkbox
irregular_heart_beat_checkbox_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[1]/div/div/div/div/div/table/tbody/tr[3]/td[3]/div[2]/label/span[1]/input"
click_button(irregular_heart_beat_checkbox_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, irregular_heart_beat_checkbox_XPATH)))
# irregular_heart_beat_checkbox = driver.find_element(By.XPATH, irregular_heart_beat_checkbox_XPATH)
# irregular_heart_beat_checkbox.click()
# time.sleep(time_to_wait_between_inputs)

# Click Submit Preliminary Form
submit_preliminary_form_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[2]/div/div/div/div/button"
click_button(submit_preliminary_form_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, submit_preliminary_form_XPATH)))
# submit_preliminary_form = driver.find_element(By.XPATH, submit_preliminary_form_XPATH)
# submit_preliminary_form.click()
# time.sleep(time_to_wait_between_inputs)

# Click Create an account submission button
create_an_account_submission_button_XPATH = "//*[@id=\"patientsignupform\"]/div[10]/div/div/div/div/button"
click_button(create_an_account_submission_button_XPATH)
# WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, create_an_account_submission_button_XPATH)))
# create_an_account_submission_button = driver.find_element(By.XPATH, create_an_account_submission_button_XPATH)
# create_an_account_submission_button.click()

time.sleep(5)
# driver.quit()