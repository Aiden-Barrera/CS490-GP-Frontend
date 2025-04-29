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

driver.get("http://localhost:5173/") # Open Primewell Cliniic Website

def click_button(XPATH_LINK):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    element.click()
    driver.execute_script("arguments[0].scrollIntoView(true);", element)
    time.sleep(time_to_wait_between_inputs)

def enter_input(XPATH_LINK, input):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView(true);", element)
    element.clear()
    element.send_keys(input)
    time.sleep(time_to_wait_between_inputs)

# Click Login button
login_button_XPATH = "//*[@id=\"root\"]/div/div/header/button[1]"
click_button(login_button_XPATH)

# Click Patient button
patient_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[1]"
click_button(patient_button_XPATH)

# Enter Email
email_XPATH = "//*[@id=\"email\"]"
enter_input(email_XPATH, "cjellicorse7@webs.com") # Change email to a person who doesn't have a doctor if needed

# Enter Password
password_XPATH = "//*[@id=\"pw\"]"
enter_input(password_XPATH, "bY8.w$&W6J") # Change password to a person who doesn't have a doctor if needed

# Click Log in button
log_in_button_XPATH = "/html/body/div[3]/div/div[2]/div/div[1]/div/div/div[1]/div/form/div[3]/div/div/div/div/button"
click_button(log_in_button_XPATH)

# Click Patient Portal link in navbar
patient_portal_link_XPATH = "//*[@id=\"root\]/div/div/header/ul/li[3]/span/a"
click_button(patient_portal_link_XPATH)

# Click Request link on side bar
request_link_XPATH = "//*[@id=\"root\"]/div/div/div/div[1]/ul/li[2]/span/a"
click_button(request_link_XPATH)

# Click first doctors dropdown button 
request_doctor_dropdown_button_XPATH = "//*[@id=\"root\"]/div/div/div/div[2]/div/div/div[1]/div/button"
click_button(request_doctor_dropdown_button_XPATH)

# Click first time slot
first_time_slot_button_XPATH = "//*[@id=\"root\"]/div/div/div/div[2]/div/div/div[1]/div[2]/div[2]/div[1]/div[1]"
click_button(first_time_slot_button_XPATH)

# Enter Comment Text
comment_text_XPATH = "//*[@id=\"Comment_Text\"]"
enter_input(comment_text_XPATH, "Good workout, was really burning near the end") # also submits the form

# Click Create Discussion Post button
add_a_comment_button_XPATH = "/html/body/div[4]/div/div[2]/div/div[1]/div/div/div/div/form/div[2]/div/div/div/div/button"
click_button(add_a_comment_button_XPATH)


time.sleep(10)
driver.quit()
