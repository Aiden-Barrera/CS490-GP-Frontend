from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

service = Service(excutable_path="chromedriver.exe")
driver = webdriver.Chrome(service=service)

driver.get("https://duckduckgo.com/")

WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.CLASS_NAME, "searchbox_input__rnFzM")))
input_element = driver.find_element(By.CLASS_NAME, "searchbox_input__rnFzM")
input_element.clear()
input_element.send_keys("fortnite" + Keys.ENTER)

WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.PARTIAL_LINK_TEXT, "Fortnite | Free-to-Play Cross-Platform Game - Fortnite")))
link = driver.find_element(By.PARTIAL_LINK_TEXT, "Fortnite | Free-to-Play Cross-Platform Game - Fortnite")
link.click()




time.sleep(10)
driver.quit()