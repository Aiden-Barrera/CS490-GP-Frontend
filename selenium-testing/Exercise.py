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

driver.get("http://localhost:5173")

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

#Navigate to Regiment
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Regiment")

#Navigate to Exercises to edit Regiment
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "EXERCISES")

WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.CLASS_NAME, "ant-card-body")),
)

wait_and_click(driver, By.ID, "clear-regiment")

#notif_msg = WebDriverWait(driver, 60).until(
#    EC.presence_of_element_located((By.XPATH, "//div[@class='ant-notification-notice-message']"))
#)

#assert notif_msg.is_displayed()
#assert notif_msg.is_displayed()

wait_and_click(driver, By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")
wait_and_click(driver, By.ID, "intervention-list")
wait_and_click(driver, By.ID, "next-button")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Regiment")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "EXERCISES")


#wait_and_click(driver, By.ID, "create-exercise")

wait_and_click(driver, By.ID, "category-Upper Body")

# Select an exercise
wait_and_click(driver, By.ID, "select-button-2")

# Schedule
wait_and_click(driver, By.ID, "schedule-button")

# Pick days
wait_and_click(driver, By.ID, "day-Wednesday")
wait_and_click(driver, By.ID, "day-Friday")

# Find the ant-modal-close element
submit_ex = WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "submit-exercises")),
)

submit_ex.click() 
modal = WebDriverWait(driver, 60).until(EC.presence_of_element_located((By.CLASS_NAME, "ant-modal")))
time.sleep(1)
ActionChains(driver).send_keys(Keys.ESCAPE).perform()

# Now it's safe to click
WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")),
)
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Regiment")


time.sleep(5)  # let user see the result for a bit
driver.quit()
