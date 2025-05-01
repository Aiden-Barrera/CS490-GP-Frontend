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
time_to_wait_between_inputs = 0.2

driver.get("http://localhost:5173/") # Open Primewell Cliniic Website

def click_button(XPATH_LINK):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    element.click()
    # driver.execute_script("arguments[0].scrollIntoView(true);", element)
    time.sleep(time_to_wait_between_inputs)

def enter_input(XPATH_LINK, input):
    WebDriverWait(driver, 5).until(EC.presence_of_element_located((By.XPATH, XPATH_LINK)))
    element = driver.find_element(By.XPATH, XPATH_LINK)
    driver.execute_script("arguments[0].scrollIntoView({block: 'center'});", element)
    # driver.execute_script("arguments[0].scrollIntoView(true);", element)
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

# Click Start a Discussion button
start_a_discussion_button_XPATH = "//*[@id=\"root\"]/div/div/div/div/button"
click_button(start_a_discussion_button_XPATH)

# Enter Excercise Name
exercise_name_XPATH = "//*[@id=\"Exercise_Name\"]"
exercise_names = [
    "Push Up",
    "Pull Up",
    "Plank",
    "Squat",
    "Deadlift",
    "Bench Press",
    "Glude bridge",
    "Jumping lunge",
    "Crunch",
    "Leg raises",
    "Bicep curls",
    "Tricep pushdown",
    "Hamstring curls",
]
enter_input(exercise_name_XPATH, random.choice(exercise_names))

# Enter Muscle Group
muscle_group_XPATH = "//*[@id=\"Muscle_Group\"]"
muscle_groups = [
    "Chest",
    "Back",
    "Shoulders",
    "Biceps",
    "Triceps",
    "Forearms",
    "Quadriceps",
    "Hamstrings",
    "Glutes",
    "Calves",
    "Abdominals",
    "Traps",
    "Lats",
    "Rhomboids",
    "Rotator Cuff",
]
enter_input(muscle_group_XPATH, random.choice(muscle_groups))

# Enter Excercise Class
# # exercise_class_XPATH = "//*[@id=\"Exercise_Class\"]"
# exercise_class = fake.random_element(elements=('Upper Body', 'Lower Body', 'Core', 'Full-Body & HIIT', 'Endurance & Cardio', 'Flexibility & Yoga'))
# enter_input(exercise_class_XPATH, exercise_class)

exercise_class_XPATH = "//*[@id=\"Exercise_Class\"]"
# exercise_class_dropdown_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/form/div[3]/div/div[2]/div/div/div/div/span/span[1]/input"
click_button(exercise_class_XPATH)

upper_body_XPATH = "/html/body/div[4]/div/div/div[2]/div/div/div/div[1]/div"
click_button(upper_body_XPATH)

# Enter Sets
sets_XPATH = "//*[@id=\"Sets\"]"
enter_input(sets_XPATH, 3)

# Enter Reps
reps_XPATH = "//*[@id=\"Reps\"]"
enter_input(reps_XPATH, 12)

# Enter Description
description_XPATH = "//*[@id=\"Exercise_Description\"]"
enter_input(description_XPATH, "Push or pull the weight")

# Enter Feedback
feedback_XPATH = "//*[@id=\"Forum_Text\"]"
enter_input(feedback_XPATH, "Use lower weights" + Keys.ENTER) # also submits the form

# Click Create Discussion Post button
# create_discussion_post_button_XPATH = "/html/body/div[2]/div/div[2]/div/div[1]/div/div/div/div/form/div[8]/div/div/div/div/button"
# click_button(create_discussion_post_button_XPATH)


time.sleep(5)
driver.quit()