from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver import ActionChains
import time
import random
from faker import Faker

service = Service(excutable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)
fake = Faker()
time_to_wait_between_inputs = 0.2

# driver.get("http://localhost:5173/") # Open Primewell Cliniic Website
driver.get("https://cs490-gp-frontend-production.up.railway.app/") # Open Primewell Cliniic Website

def click_button(XPATH_LINK):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    element.click()
    time.sleep(time_to_wait_between_inputs)

def enter_input(XPATH_LINK, input):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    element.clear()
    element.send_keys(input)
    time.sleep(time_to_wait_between_inputs)

# Click Create account button
create_account_button_XPATH = "//*[@id=\"root\"]/div/div/header/button[2]"
click_button(create_account_button_XPATH)

# Click Pharmacy button
pharmacy_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[3]"
click_button(pharmacy_XPATH)

# Enter Pharmacy Name
pharmacy_name_XPATH = "//*[@id=\"pharmacysignupform_Company_Name\"]"
pharmacy_name_part_1 = fake.random_element(elements=('Medi', 'Health', 'Care', 'Pill', 'Rx', 'Well'))
pharmacy_name_part_2 = fake.random_element(elements=('Pharmacy', 'Drugs', 'Medical', 'Solutions', 'Center'))
pharmacy_name = f"{pharmacy_name_part_1}{pharmacy_name_part_2}"
enter_input(pharmacy_name_XPATH, pharmacy_name)

# Enter Pharmacy Email
pharmacy_email_XPATH = "//*[@id=\"pharmacysignupform_Email\"]"
enter_input(pharmacy_email_XPATH, fake.email())

# Enter Pharmacy Address
pharmacy_address_XPATH = "//*[@id=\"pharmacysignupform_Address\"]"
pharmacy_address = f"{fake.building_number()} {fake.street_name().split(' ')[0]} {fake.street_suffix()}"
enter_input(pharmacy_address_XPATH, pharmacy_address)

# Enter Pharmacy Zip Code
pharmacy_zip_code_XPATH = "//*[@id=\"pharmacysignupform_Zip\"]"
enter_input(pharmacy_zip_code_XPATH, 88010 + random.randint(0, 15))

# Enter Pharmacy Work Hours
pharmacy_work_hours_XPATH = "//*[@id=\"pharmacysignupform_Work_Hours\"]"
enter_input(pharmacy_work_hours_XPATH, "8:00-22:00")

# Enter Pharmacy Password
pharmacy_password_XPATH = "//*[@id=\"pharmacysignupform_PW\"]"
enter_input(pharmacy_password_XPATH, fake.password())

# Click Create an account submission button
create_an_account_submission_button_XPATH = "//*[@id=\"pharmacysignupform\"]/div[7]/div/div/div/div/button"
click_button(create_an_account_submission_button_XPATH)

time.sleep(60)
driver.quit()