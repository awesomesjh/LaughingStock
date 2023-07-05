// @ts-check
const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page, request }) => {
  await request.delete('http://localhost:3000/api/testing/reset')
  await request.post('http://localhost:3000/api/users', {
    data: {
      username: 'numbers',
      password: '12345'
    }
  })
  await page.goto('http://localhost:3000')
})

test.describe('when not logged in', () => {
  test('main page can be opened', async ({ page }) => {
    const welcomeMessage = page.getByText('Welcome to Laughing Stock')
    await expect(welcomeMessage).toHaveText('Welcome to Laughing Stock')

    const loginButton = page.getByRole('button', { name: 'Login' })
    await expect(loginButton).toHaveText('Login')
  })

  test('login page can be opened', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' })
    await loginButton.click()

    const loginMessage = page.getByText('Login to Laughing Stock')
    await expect(loginMessage).toHaveText('Login to Laughing Stock')
    
    const usernameInput = page.getByLabel('Username')
    await usernameInput.type('numbers')
    await expect(usernameInput).toHaveValue('numbers')

    const passwordInput = page.getByLabel('Password')
    await passwordInput.type('12345')
    await expect(passwordInput).toHaveValue('12345')

    await expect(loginButton).toHaveText('Login')

    const signUpMessage = page.getByText("Don't have an account?")
    await expect(signUpMessage).toHaveText("Don't have an account?")

    const signUpButton = page.getByRole('button', { name: 'Sign Up' })
    await expect(signUpButton).toHaveText('Sign Up')
  })

  test('sign up page can be opened', async ({ page }) => {
    const loginButton = page.getByRole('button', { name: 'Login' })
    await loginButton.click()

    const signUpButton = page.getByRole('button', { name: 'Sign Up' })
    await signUpButton.click()

    const signUpMessage = page.getByText('Sign up for Laughing Stock')
    await expect(signUpMessage).toHaveText('Sign up for Laughing Stock')

    const usernameInput = page.getByLabel('Username')
    await usernameInput.type('numbers')
    await expect(usernameInput).toHaveValue('numbers')

    const passwordInput = page.getByLabel('Password')
    await passwordInput.type('12345')
    await expect(passwordInput).toHaveValue('12345')

    const reminder = page.getByText("Don't forget your password")
    await expect(reminder).toHaveText("Don't forget your password")

    await expect(signUpButton).toHaveText('Sign Up')

    const loginMessage = page.getByText('Already have an account?')
    await expect(loginMessage).toHaveText('Already have an account?')

    await expect(loginButton).toHaveText('Login')
  })

  test.describe('sign up', () => {
    test.beforeEach(async ({ page }) => {
      const loginButton = page.getByRole('button', { name: 'Login' })
      await loginButton.click()

      const signUpButton = page.getByRole('button', { name: 'Sign Up' })
      await signUpButton.click()   
    })

    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = page.getByLabel('Username')
      await usernameInput.type('hello')

      const passwordInput = page.getByLabel('Password')
      await passwordInput.type('world')

      const signUpButton = page.getByRole('button', { name: 'Sign Up' })
      await signUpButton.click()
      
      const successMessage = page.getByText('Account successfully created')
      await expect(successMessage).toHaveText('Account successfully created')
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = page.getByLabel('Username')
      await usernameInput.type('numbers')

      const passwordInput = page.getByLabel('Password')
      await passwordInput.type('12345')

      const signUpButton = page.getByRole('button', { name: 'Sign Up' })
      await signUpButton.click()

      const errorMessage = page.getByText('Username has been taken')
      await expect(errorMessage).toHaveText('Username has been taken')
    })
  })

  test.describe('login', () => {
    test.beforeEach(async ({ page }) => {
      const loginButton = page.getByRole('button', { name: 'Login' })
      await loginButton.click() 
    })

    test('succeeds with correct credentials', async ({ page }) => {
      const usernameInput = page.getByLabel('Username')
      await usernameInput.type('numbers')

      const passwordInput = page.getByLabel('Password')
      await passwordInput.type('12345')

      const loginButton = page.getByRole('button', { name: 'Login' })
      await loginButton.click()
      
      const successMessage = page.getByText('Welcome to Laughing Stock, numbers!')
      await expect(successMessage).toHaveText('Welcome to Laughing Stock, numbers!')
    })

    test('fails with wrong credentials', async ({ page }) => {
      const usernameInput = page.getByLabel('Username')
      await usernameInput.type('numbers')

      const passwordInput = page.getByLabel('Password')
      await passwordInput.type('54321')

      const loginButton = page.getByRole('button', { name: 'Login' })
      await loginButton.click()

      const errorMessage = page.getByText('Invalid username or password')
      await expect(errorMessage).toHaveText('Invalid username or password')
    })
  })
})

test.describe('when logged in', () => {
  let user = null
  test.beforeEach(async ({ page, request }) => {
    const response = await request.post('http://localhost:3000/api/login', {
      data: {
        username: 'numbers',
        password: '12345'
      }
    })
    user = await response.json()
    await page.evaluate((user) => {
      window.localStorage.setItem('loggedLaughingStockUser', JSON.stringify(user))       
    }, user)
  })


  test.describe('no stocks intially', () => {
    test.beforeEach(async ({ page }) => {
      await page.goto('http://localhost:3000')
    })

    test('user can add new stock', async ({ page }) => {
      const symbolInput = page.getByLabel('Symbol')
      await symbolInput.type('AAPL')

      const quantityInput = page.getByLabel('Quantity')
      await quantityInput.type('2')

      const addButton = page.getByRole('button', { name: 'Add' })
      await addButton.click()

      const stockSymbol = page.getByText('AAPL')
      await expect(stockSymbol).toHaveText('AAPL')

      const stockQuantity = page.locator('table').getByPlaceholder('Enter Quantity')
      await expect(stockQuantity).toHaveValue('2')
    })

    test('invalid stock cannot be added', async ({ page }) => {
      const symbolInput = page.getByLabel('Symbol')
      await symbolInput.type('invalid')

      const quantityInput = page.getByLabel('Quantity')
      await quantityInput.type('2')

      const addButton = page.getByRole('button', { name: 'Add' })
      await addButton.click()

      const errorMessage = page.getByText('Stock not found')
      await expect(errorMessage).toHaveText('Stock not found')
    })
  })

  test.describe('1 stock initially', () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3000/api/stocks', {
        data: {
          symbol: 'TSLA',
          quantity: '3'
        },
        headers: {
          Authorization: `bearer ${user.token}`
        }
      })
      await page.goto('http://localhost:3000')
      await page.getByText('Total portfolio value').waitFor()
    })

    test('user can change stock quantity', async ({ page }) => {
      const stockQuantity = page.locator('table').getByPlaceholder('Enter Quantity')
      await stockQuantity.type('4')
  
      const saveButton = page.getByRole('button', { name: 'Save' })
      await saveButton.click()
      await expect(stockQuantity).toHaveValue('34')
      
      const successMessage = page.getByText('Quantity has been successfully updated')
      await expect(successMessage).toHaveText('Quantity has been successfully updated')
    })
  
    test('user can delete stock', async ({ page }) => {
      const deleteButton = page.getByTestId('delete')
      await deleteButton.click()
  
      const stockSymbol = page.getByText('TSLA')
      await expect(stockSymbol).toHaveCount(0)
  
      const successMessage = page.getByText('Stock successfully deleted')
      await expect(successMessage).toHaveText('Stock successfully deleted')
    })
  })

  test.describe('2 stocks initially', () => {
    test.beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3000/api/stocks', {
        data: {
          symbol: 'TSLA',
          quantity: '3'
        },
        headers: {
          Authorization: `bearer ${user.token}`
        }
      })
      await request.post('http://localhost:3000/api/stocks', {
        data: {
          symbol: 'AAPL',
          quantity: '2'
        },
        headers: {
          Authorization: `bearer ${user.token}`
        }
      })
      await page.goto('http://localhost:3000')
      await page.getByText('Total portfolio value').waitFor()
    })

    test('symbol ascending by default', async ({ page }) => {
      const firstSymbol = page.locator('td').first()
      await expect(firstSymbol).toHaveText('AAPL')
    })

    test('symbol descending is working', async ({ page }) => {
      const symbolDescending = page.getByTestId('symbol-descending')
      await symbolDescending.click()

      const firstSymbol = page.locator('td').first()
      await expect(firstSymbol).toHaveText('TSLA')
    })

    test('quantity ascending is working', async ({ page }) => {
      const quantityAscending = page.getByTestId('quantity-ascending')
      await quantityAscending.click()

      const firstQuantity = page.getByPlaceholder('Enter Quantity').first()
      await expect(firstQuantity).toHaveValue('2')
    })

    test('quantity descending is working', async ({ page }) => {
      const quantityDescending = page.getByTestId('quantity-descending')
      await quantityDescending.click()

      const firstQuantity = page.getByPlaceholder('Enter Quantity').first()
      await expect(firstQuantity).toHaveValue('3')
    })
  })
})