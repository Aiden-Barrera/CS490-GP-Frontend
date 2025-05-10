#Script is 2 of 2 that deals with the Appointment set-up of our website
#First signed in as patient and send a message in appointment channel of doctor 
#Sign out as patient and log in as doctor
#Send a message and end the appointment
#Prompted to give feedback and prescibe medicine

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


#Login as Patient to send message in appointment
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

#Navigate to appointment to send message (enable for doctor to end appointment)
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "PATIENT PORTAL")
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "Appointments")
wait_and_click(driver, By.ID, "appt-btn")
wait_and_click(driver, By.ID, "message")
ActionChains(driver).send_keys("Testing").perform()
wait_and_click(driver, By.ID, "send-btn")

#Sign out as Patient
wait_and_click(driver, By.ID, "profileButton")
wait_and_click(driver, By.ID, "signOut")


#Login as Doctor
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

#Look at patient info
wait_and_click(driver, By.PARTIAL_LINK_TEXT, "DOCTOR PORTAL")
wait_and_click(driver, By.ID, "view-dashboard")
driver.switch_to.active_element.send_keys(Keys.ESCAPE)
wait_and_click(driver, By.ID, "view-forum")
driver.switch_to.active_element.send_keys(Keys.ESCAPE)

#Start appointment
wait_and_click(driver, By.ID, "start-appt")
wait_and_click(driver, By.ID, "message")

#Type,send,end appointmeent, and send feedback/precription
ActionChains(driver).send_keys("Testing").perform()
wait_and_click(driver, By.ID, "send-btn")
wait_and_click(driver, By.ID, "end-appt-btn")

WebDriverWait(driver, 30).until(
    EC.presence_of_element_located((By.ID, "doctor_feedback_text"))
)
wait_and_click(driver, By.ID, "doctor_feedback_text")
ActionChains(driver).send_keys("Testing").perform()
wait_and_click(driver, By.ID, "send-feedback")

wait_and_click(driver, By.ID, "prescription")
ActionChains(driver).send_keys(Keys.ENTER).perform()

wait_and_click(driver, By.ID, "quantity")
quantity = driver.find_element(By.ID, "quantity")
quantity.send_keys("2")

wait_and_click(driver, By.ID, "submit-prescription")

