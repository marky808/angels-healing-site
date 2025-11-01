from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import Select
import time

def submit_form():
    # Chrome driver setup
    driver = webdriver.Chrome()
    
    try:
        # URL e jao
        driver.get("https://angels-healing.com")
        driver.maximize_window()
        
        # Page load hoyeche kina check koro
        WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.TAG_NAME, "form"))
        )
        
        print("Page loaded successfully!")
        time.sleep(2)
        
        # Form fields fillup - tumi tumhar form er field gulo onujayi change korte paro
        
        # Text input fields
        name_field = driver.find_element(By.NAME, "company")  # or By.ID, "name"
        name_field.clear()
        name_field.send_keys("John")


        name_field = driver.find_element(By.NAME, "name")  # or By.ID, "name"
        name_field.clear()
        name_field.send_keys("John Doe")
        
        email_field = driver.find_element(By.NAME, "email")
        email_field.clear()
        email_field.send_keys("aajbh143@gmail.com")
        
        phone_field = driver.find_element(By.NAME, "phone")
        phone_field.clear()
        phone_field.send_keys("01712345678")
        
        message_field = driver.find_element(By.NAME, "message")
        message_field.clear()
        message_field.send_keys("This is a test message from Selenium automation.")
        
        # Dropdown select (jodi thake)
        # select_element = Select(driver.find_element(By.NAME, "dropdown_name"))
        # select_element.select_by_visible_text("Option 1")
        
        # Checkbox select (jodi thake)
        # checkbox = driver.find_element(By.NAME, "checkbox_name")
        # if not checkbox.is_selected():
        #     checkbox.click()
        
        # Radio button select (jodi thake)
        # radio = driver.find_element(By.ID, "radio_id")
        # radio.click()
        
        print("Form filled successfully!")
        time.sleep(2)
        
        # Submit button click koro
        submit_button = driver.find_element(By.XPATH, "//button[@type='submit']")
        # Or: submit_button = driver.find_element(By.NAME, "submit")
        # Or: submit_button = driver.find_element(By.CSS_SELECTOR, "button[type='submit']")
        
        submit_button.click()
        print("Form submitted successfully!")
        
        # Submit er por wait koro (success message ba redirect dekhte)
        time.sleep(5)
        
        # Success message check (optional)
        try:
            success_msg = WebDriverWait(driver, 10).until(
                EC.presence_of_element_located((By.CLASS_NAME, "success"))
            )
            print(f"Success Message: {success_msg.text}")
        except:
            print("No success message found or different selector needed")
        
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        driver.save_screenshot("error_screenshot.png")
        print("Screenshot saved as error_screenshot.png")
    
    finally:
        # Browser bondho koro
        time.sleep(3)
        driver.quit()
        print("Browser closed!")

submit_form()
