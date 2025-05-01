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
    EC.presence_of_element_located((By.ID, "pharm-btn")),
)

wait_and_click(driver, By.ID, "pharm-btn")

WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "email")),
)

patient_email = driver.find_element(By.ID, "email")
patient_email.send_keys("nmacgeaney1@sun.com")

patient_password = driver.find_element(By.ID, "pw")
patient_password.send_keys('sP2,G0%E/j!c!')

wait_and_click(driver, By.ID, "login-button")

wait_and_click(driver, By.ID, "create-medicine")

wait_and_click(driver, By.ID, "Pill_Name")

pill_name = driver.find_element(By.ID, "Pill_Name")
pill_name.send_keys("Test Medicine")

wait_and_click(driver, By.ID, "Pill_ID")

pill_id = driver.find_element(By.ID, "Pill_ID")
pill_id.send_keys("24")

wait_and_click(driver, By.ID, "Dosage")

pill_dosage = driver.find_element(By.ID, "Dosage")
pill_dosage.send_keys("4")

wait_and_click(driver, By.ID, "Cost")

pill_cost = driver.find_element(By.ID, "Cost")
pill_cost.send_keys("34.67")

wait_and_click(driver, By.ID, "submit-new-pill")

wait_and_click(driver, By.ID, "delete-medicine-15")