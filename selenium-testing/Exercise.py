#This script involves viewing, clearing, and adding to regiment 
#1) Log in as a patient
#2) Navigate to PATIENT PORTAL, then to regiment tab to see intial regiment
#3) Navigate to EXERCISE, clear regiment, then see regiment is cleared
#4) Start adding exercises to new regimet
#5) Navigate to PATIENT PORTAL, then to regiment tab to see updated regiment
#PREP FOR VID: If you want, before testing, sign into the patient info provided
#within the code and make a custom regiment. Then run the code, this will better
#protray the difference between the intial regiment and final regiment (OPTIONAL)

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
    
    # Dismiss notification if present
    try:
        notif = WebDriverWait(driver, 2).until(
            EC.presence_of_element_located((By.CLASS_NAME, "ant-notification"))
        )
        close_btn = notif.find_element(By.CLASS_NAME, "ant-notification-notice-close")
        driver.execute_script("arguments[0].click();", close_btn)
        time.sleep(0.5)
        # wait until the notification disappears
        WebDriverWait(driver, 10).until(
            EC.invisibility_of_element(notif)
        )
    except:
        pass  # Notification not present or already closed

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


wait_and_click(driver, By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")

wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Regiment")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "EXERCISES")


#wait_and_click(driver, By.ID, "create-exercise")

wait_and_click(driver, By.ID, "category-Upper Body")

# Select an exercise
wait_and_click(driver, By.ID, "select-button-2")
wait_and_click(driver, By.ID, "select-button-8")


# Schedule
click_schedule = WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "schedule-button"))
)
wait_and_click(driver, By.ID, "schedule-button")

# Pick days
wait_and_click(driver, By.ID, "day-2")
wait_and_click(driver, By.ID, "day-4")

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

wait_and_click(driver, By.ID, "profileButton")

wait_and_click(driver, By.ID, "signOut")
time.sleep(60)  # let user see the result for a bit
driver.quit()
