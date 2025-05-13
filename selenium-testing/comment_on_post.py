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
time_to_wait_between_inputs = 1

# driver.get("http://localhost:5173/") # Open Primewell Cliniic Website
driver.get("https://cs490-gp-frontend-production.up.railway.app/") # Open Primewell Cliniic Website


def click_button(XPATH_LINK):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    element.click()
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    time.sleep(time_to_wait_between_inputs)

def enter_input(XPATH_LINK, input):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
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

form_chosen = 3 # random.randint(1, 10)

# Click Comment Icon
comment_icon_XPATH = f"//*[@id=\"root\"]/div/div/div/div/div/div[{form_chosen}]/div[2]/div[2]/div/span"
click_button(comment_icon_XPATH)

# Click Add a Comment button
add_a_comment_button_XPATH = f"//*[@id=\"root\"]/div/div/div/div/div/div[{form_chosen}]/div[2]/div[3]/button"
click_button(add_a_comment_button_XPATH)

# Enter Comment Text
comment_text_XPATH = "//*[@id=\"Comment_Text\"]"
enter_input(comment_text_XPATH, "Good workout, was really burning near the end") # also submits the form

# Click Create Discussion Post button
add_a_comment_button_XPATH = "/html/body/div[4]/div/div[2]/div/div[1]/div/div/div/div/form/div[2]/div/div/div/div/button"
click_button(add_a_comment_button_XPATH)


time.sleep(60)
driver.quit()
