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

# Click Login button
login_button_XPATH = "//*[@id=\"root\"]/div/div/header/button[1]"
click_button(login_button_XPATH)

# Click Patient button
patient_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[1]"
click_button(patient_button_XPATH)

# Enter Email
email_XPATH = "//*[@id=\"email\"]"
enter_input(email_XPATH, "kcamfield8@tripod.com")

# Enter Password
password_XPATH = "//*[@id=\"pw\"]"
enter_input(password_XPATH, "dI8?5RAh|0UA)tf")

# Click Log in button
log_in_button_XPATH = "/html/body/div[3]/div/div[2]/div/div[1]/div/div/div[1]/div/form/div[3]/div/div/div/div/button"
click_button(log_in_button_XPATH)

# Click Posts link in navbar
posts_link_XPATH = "//*[@id=\"root\"]/div/div/header/ul/li[2]/span/a"
click_button(posts_link_XPATH)

# Click Start a Discussion button
start_a_discussion_button_XPATH = "//*[@id=\"root\"]/div/div/div/div/button"
click_button(start_a_discussion_button_XPATH)

# Enter Excercise Name
excercise_name_XPATH = "//*[@id=\"Exercise_Name\"]"
enter_input(excercise_name_XPATH, fake.first_name())

# Enter Muscle Group
muscle_group_XPATH = "//*[@id=\"Muscle_Group\"]"
enter_input(muscle_group_XPATH, fake.last_name())

# Enter Excercise Class
excercise_class_XPATH = "//*[@id=\"Exercise_Class\"]"
enter_input(excercise_class_XPATH, fake.email())

# Enter Sets
sets_XPATH = "//*[@id=\"Sets\"]"
enter_input(sets_XPATH, 3)

# Enter Reps
reps_XPATH = "//*[@id=\"Reps\"]"
enter_input(reps_XPATH, 12)

# Enter Description
description_XPATH = "//*[@id=\"Exercise_Description\"]"
enter_input(description_XPATH, 88010)

# Enter Feedback
feedback_XPATH = "//*[@id=\"Forum_Text\"]"
enter_input(feedback_XPATH, 88010)

time.sleep(50)
driver.quit()