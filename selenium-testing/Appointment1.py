#Script is 1 of 2 that deals with the Appointment set-up of our website
#In this script, first signed in as patient and go through the motion of setting an appointment with their doctor
#Once done so, will sign out as patient and log in as doctor to start appointment

from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time

def wait_and_click(driver, by, value, timeout=10):
    wait = WebDriverWait(driver, timeout)
    element = wait.until(EC.element_to_be_clickable((by, value)))
    
    # Dismiss notification if present
    try:
        notif = WebDriverWait(driver, 2).until(
            EC.presence_of_element_located((By.CLASS_NAME, "ant-notification"))
        )
        close_btn = notif.find_element(By.CLASS_NAME, "ant-notification-notice-close")
        driver.execute_script("arguments[0].click();", close_btn)
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
driver.maximize_window()

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
patient_email.send_keys("bpottberry9@phoca.cz")

patient_password = driver.find_element(By.ID, "pw")
patient_password.send_keys('zE6#ZSDoFPSaZ')

wait_and_click(driver, By.ID, "login-button")

#Navigate to Request
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Request")
wait_and_click(driver, By.ID, "doctor-request-dropdown")
wait_and_click(driver, By.XPATH, "//td[@title='2025-05-21']")
wait_and_click(driver, By.ID, "slot-card-0")
wait_and_click(driver, By.XPATH, "(//div[contains(@class, 'ant-select-selector')])[3]")

ActionChains(driver).send_keys(Keys.ENTER).perform()

wait_and_click(driver, By.ID, "send-request-button")


#Sign out as Patient
wait_and_click(driver, By.ID, "profileButton")
wait_and_click(driver, By.ID, "signOut")

#Sign in as Doctor
wait_and_click(driver, By.ID, "loginButton")
WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "doctor-btn")),
)
wait_and_click(driver, By.ID, "doctor-btn")
WebDriverWait(driver, 60).until(
    EC.presence_of_element_located((By.ID, "email")),
)
patient_email = driver.find_element(By.ID, "email")
patient_email.send_keys("pokroy6@aol.com")
patient_password = driver.find_element(By.ID, "pw")
patient_password.send_keys('lS7./|.Wvr1*4/qX')
wait_and_click(driver, By.ID, "login-button")

#Navigate to Request and accept most recent one
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "DOCTOR PORTAL")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Incoming Requests")
wait_and_click(driver, By.ID, "accept-button")

#Start appointment
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Dashboard")
driver.switch_to.active_element.send_keys(Keys.ESCAPE)
wait_and_click(driver, By.ID, "start-appt")

time.sleep(60)  # let user see the result for a bit
driver.quit()
