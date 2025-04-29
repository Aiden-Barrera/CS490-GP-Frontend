from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time
import random
from faker import Faker

service = Service(excutable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)
# driver.maximize_window()
fake = Faker()
time_to_wait_between_inputs = 0.2
patient_created = False

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

def login_as_user():
    # Click Login button
    login_button_XPATH = "//*[@id=\"root\"]/div/div/header/button[1]"
    click_button(login_button_XPATH)

    # Click Pharmacy button
    patient_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[3]"
    click_button(patient_button_XPATH)

    # Enter Email
    email_XPATH = "//*[@id=\"email\"]"
    enter_input(email_XPATH, "nmacgeaney1@sun.com") # Change email to a person who doesn't have a doctor if needed

    # Enter Password
    password_XPATH = "//*[@id=\"pw\"]"
    enter_input(password_XPATH, "sP2,G0%E/j!c!") # Change password to a person who doesn't have a doctor if needed

    # Click Log in button
    log_in_button_XPATH = "/html/body/div[3]/div/div[2]/div/div[1]/div/div/div[1]/div/form/div[3]/div/div/div/div/button"
    click_button(log_in_button_XPATH)

login_as_user()

# Enter Search Medicine
search_medicine_XPATH = "//*[@id=\"root\"]/div/div/div/div[2]/div/div[2]/div/div[1]/span/input"
enter_input(search_medicine_XPATH, "Witch Hazel")

time.sleep(5)
driver.quit()
