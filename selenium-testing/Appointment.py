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
    time.sleep(2)
    return element

service = Service(excutable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

# driver.get("http://localhost:5173")
driver.get("https://cs490-gp-frontend-production.up.railway.app/") # Open Primewell Cliniic Website

# Login page
wait_and_click(driver, By.ID, "loginButton")

WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "patient-btn")),
)

wait_and_click(driver, By.ID, "patient-btn")

WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "email")),
)

patient_email = driver.find_element(By.ID, "email")
patient_email.send_keys("cdignum0@ucla.edu")

patient_password = driver.find_element(By.ID, "pw")
patient_password.send_keys('cP0"},1la&q')

wait_and_click(driver, By.ID, "login-button")

#Navigate to Request
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Request")
wait_and_click(driver, By.ID, "doctor-request-dropdown")
wait_and_click(driver, By.ID, "slot-card-0")
wait_and_click(driver, By.CSS_SELECTOR, '[data-testid="tier-select"]')

ActionChains(driver).send_keys(Keys.ENTER).perform()

wait_and_click(driver, By.ID, "send-request-button")

time.sleep(5)  # let user see the result for a bit
driver.quit()
