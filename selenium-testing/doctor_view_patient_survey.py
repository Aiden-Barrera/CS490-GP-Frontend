# Login in as a patient or create a account, then fill out the daily survey
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
driver.maximize_window()
fake = Faker()
time_to_wait_between_inputs = 1
patient_created = False

# driver.get("http://localhost:5173/") # Open Primewell Cliniic Website
driver.get("https://cs490-gp-frontend-production.up.railway.app/") # Open Primewell Cliniic Website

def click_button(XPATH_LINK):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    element.click()
    # driver.execute_script("arguments[0].scrollIntoView(true);", element)
    time.sleep(time_to_wait_between_inputs)

def enter_input(XPATH_LINK, input):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    # driver.execute_script("arguments[0].scrollIntoView(true);", element)
    element.clear()
    element.send_keys(input)
    time.sleep(time_to_wait_between_inputs)

def login_as_user():
    # Click Login button
    login_button_XPATH = "//*[@id=\"root\"]/div/div/header/button[1]"
    click_button(login_button_XPATH)

    # Click Doctor button
    doctor_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[2]"
    click_button(doctor_button_XPATH)

    # Enter Email
    email_XPATH = "//*[@id=\"email\"]"
    enter_input(email_XPATH, "wgouldbourn0@facebook.com") # Change email to a person who doesn't have a doctor if needed

    # Enter Password
    password_XPATH = "//*[@id=\"pw\"]"
    enter_input(password_XPATH, "dU0/Ib46m#9d") # Change password to a person who doesn't have a doctor if needed

    # Click Log in button
    log_in_button_XPATH = "/html/body/div[3]/div/div[2]/div/div[1]/div/div/div[1]/div/form/div[3]/div/div/div/div/button"
    click_button(log_in_button_XPATH)

login_as_user()

# Click Doctor Portal link in navbar
doctor_portal_link_XPATH = "//*[@id=\"root\"]/div/div/header/ul/li[3]/span/a"
click_button(doctor_portal_link_XPATH)
time.sleep(5)
# Click view dashboard button
view_dashboard_XPATH = "//*[@id=\"view-dashboard\"]"
click_button(view_dashboard_XPATH)



# # # Exit dashboard
# x_XPATH = "//button[@aria-label='Close']"
# click_button(x_XPATH)
# # body = driver.find_element(By.TAG_NAME, "div")
# # body.send_keys(Keys.ESCAPE)

# # Click view preliminary form button
# view_forum_XPATH = "//*[@id=\"view-forum\"]"
# click_button(view_forum_XPATH)

# time.sleep(5)

# # Exit dashboard
# x_XPATH = "/html/body/div[6]/div/div[2]/div/div[1]/div/button"
# click_button(x_XPATH)



time.sleep(60)
driver.quit()
