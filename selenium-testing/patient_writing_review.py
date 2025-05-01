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

driver.get("http://localhost:5173/") # Open Primewell Cliniic Website

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

    # Click Patient button
    patient_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/div/button[1]"
    click_button(patient_button_XPATH)

    # Enter Email
    email_XPATH = "//*[@id=\"email\"]"
    enter_input(email_XPATH, "ddriscoll2@whitehouse.gov") # Change email to a person who doesn't have a doctor if needed

    # Enter Password
    password_XPATH = "//*[@id=\"pw\"]"
    enter_input(password_XPATH, "gK4,E)S`|nvBkrY|") # Change password to a person who doesn't have a doctor if needed

    # Click Log in button
    log_in_button_XPATH = "/html/body/div[3]/div/div[2]/div/div[1]/div/div/div[1]/div/form/div[3]/div/div/div/div/button"
    click_button(log_in_button_XPATH)

login_as_user()

# Click Reviews link in navbar
reviews_link_XPATH = "//*[@id=\"root\"]/div/div/header/ul/li[5]/span/a"
click_button(reviews_link_XPATH)

# Click Doctor Welch Gouldbourn
doctor_XPATH = "//*[@id=\"root\"]/div/div/div/div/div/a[1]"
click_button(doctor_XPATH)

# Click Write a Review
write_a_review_XPATH = "//*[@id=\"root\"]/div/div/div/div/button"
click_button(write_a_review_XPATH)

# Click Rating
rating_XPATH = "//*[@id=\"rating\"]/li[4]/div"
click_button(rating_XPATH)

# Enter Review Text
review_text_XPATH = "//*[@id=\"review_text\"]"
enter_input(review_text_XPATH, "Okay doctor, sometimes too loud")

# Click Submit 
# submit_XPATH = "/html/body/div[5]/div/div[2]/div/div[1]/div/div/div/div/form/div[3]/div/div/div/div/button"
submit_XPATH = "//button[@type='submit']/span[text()='Submit']"
click_button(submit_XPATH)

time.sleep(5)
driver.quit()
