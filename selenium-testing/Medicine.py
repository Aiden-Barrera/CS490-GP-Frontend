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

service = Service(excutable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

# driver.get("http://localhost:5173")
driver.get("https://cs490-gp-frontend-production.up.railway.app/") # Open Primewell Cliniic Website

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


WebDriverWait(driver, 10).until(
    EC.invisibility_of_element_located((By.CLASS_NAME, "ant-modal-wrap"))
)

rows = driver.find_elements(By.CSS_SELECTOR, ".ant-table-tbody > tr")

# Select the last row
last_row = rows[-1]

delete_button = last_row.find_element(By.TAG_NAME, "button")

# Scroll into view and click
driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", delete_button)
delete_button.click()