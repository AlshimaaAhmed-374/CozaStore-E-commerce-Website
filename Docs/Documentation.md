<!-- Cover Page -->
#  🛒 CozaStore
###  E-commerce Website
#####  Team[14]

---


<br><br><br><br><br><br><br><br><br><br>



|👤 Team member|🆔 ID|📚 Section|
|-----------|--|-------|
|**فرحة أحمد علي زكي**|**2022170307**|****|
|**فجر أشرف اسماعيل عبدالمنعم**|**2022170305**|****|
|**كنزي عادل صلاح محمد**|**2022170316**|****|
|**الشيماء أحمد محمد علي**|**2022170071**|****|
|**بانسيه عبدالناصر محمود ابوالفتوح**|**2022170090**|****|
|**أمنية محمود أحمد محمد**|**2022170075**|****|


<div style="page-break-after: always;"></div>



## 📄 Project Overview: 

### 🛒 Introduction

**CozaStore** is a modern **online shopping platform** designed to provide users with an efficient e-commerce experience. The platform enables customers to browse, filter, and purchase products while offering additional features such as wishlists, order history tracking, and customer support.

### 🎯 Objectives

- Deliver a **user-friendly shopping experience** with intuitive navigation. 
  
- Provide **advanced product filtering** (Trending, New, Featured, Top-Selling).  
  
- Allow users to **save items for later** via a wishlist feature. 
   
- Ensure a **secure and smooth checkout process**.  
  
- Maintain **order history** for user convenience.  
  
- Offer **accessible customer support** through a dedicated Contact page.  


### 📌 Scope

This project focuses on implementing the core functionalities required for an online shopping experience, including:

- **User Management**: Registration, login, password encryption, and session handling.
- **Product Catalog**: Displaying product details, categories, and types with images.
- **Shopping Experience**:
  - Filtering products *(Trending, New, Featured, Top-Selling)* and browse them.
  - Adding items to cart or wishlist.
  - Placing orders and handling payments.
- **Order Tracking**: Storing and retrieving order history per user.
- **Support & Info Pages**: Contact page for user inquiries and About page for platform info.


### 🧩 Entities and Their Roles


#### 👤 User

- **Description**: Represents an individual registered on the platform.
- **Attributes**:
  - `Username`: Unique name of the user (required).
  - `E-mail`: Must be a valid, unique email address (required).
  - `Password`: Encrypted password (minimum 8 characters, required).
- **Other Features**:
  - Passwords are encrypted using **`bcrypt`** before being saved.
  - Includes a method to compare plaintext and hashed passwords.
- **Role in the System**:
  - Registers and logs in to the system.
  - Can place orders, add product to wishlist, view orders history, and manage personal account data.

---

#### 📦 Product

- **Description**: Represents an item available for sale in the store.
- **Attributes**:
  - `ID` , `Name`, `Price`, `Image`, `Details` , `Category` ,`Type`
- **Role in the System**:
  - Displayed to users during browsing and checkout.
  - Referenced in order records and user interactions (wishlist/cart).

---

#### 🧾 Order

- **Description**: Represents a customer's purchase transaction.
- **Attributes**:
  - `User`: Reference to the `User` who placed the order (required).
  - `Products`: List of all items included in the order. Each item includes these attributes:
    - `Product`
    - `Quantity`: Default is 1.
    - `Purchased-At-Price`
  - `Total-Amount`: Sum total of all products in the order (required).
  - `Status`: Current state of the order (`pending`, `completed`, or `cancelled`), default is `pending`.
- **Role in the System**:
  - Stores a record of user purchases.
  - Facilitates order tracking and management through the user profile.

---

