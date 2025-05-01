from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

def wait_and_click(driver, by, value, timeout=20):
    wait = WebDriverWait(driver, timeout)
    element = wait.until(EC.element_to_be_clickable((by, value)))
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    element.click()
    time.sleep(1)
    return element

service = Service(executable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

driver.get("http://localhost:5173")

# Login page
wait_and_click(driver, By.ID, "loginButton")

WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "doctor-btn")),
)

wait_and_click(driver, By.ID, "doctor-btn")

WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "email")),
)

patient_email = driver.find_element(By.ID, "email")
patient_email.send_keys("hknath8@foxnews.com")

patient_password = driver.find_element(By.ID, "pw")
patient_password.send_keys('sF6(#ehzE7')

wait_and_click(driver, By.ID, "login-button")

#Navigate to Request
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "DOCTOR PORTAL")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Incoming Requests")