import tkinter as tk

class Calculator:
    def __init__(self, master):
        self.master = master
        self.theme = 'light'  # Default theme choice
        self.last_calculation = False  # Track if the last action was a calculation

        # Initialize display label before applying the theme
        self.display_label = tk.Label(master, text="", anchor="e", font=("Arial", 18))
        self.display_label.grid(row=0, column=0, columnspan=5, sticky="nsew", padx=10, pady=10)

        # Initialize entry widget
        self.entry = tk.Entry(master, font=("Arial", 24), justify="right")
        self.entry.grid(row=1, column=0, columnspan=5, padx=10, pady=10)

        # Now apply the theme, because display_label and entry are now defined
        self.set_theme(self.theme)

        # Setup buttons
        self.setup_buttons()

    def append_to_expression(self, value):
        if self.last_calculation:
            self.display_label.config(text="")
            self.last_calculation = False
        current_text = self.display_label.cget("text")
        self.display_label.config(text=current_text + str(value))

    def clear_entry(self):
        self.entry.delete(0, tk.END)
        self.display_label.config(text="")
        self.last_calculation = False

    def calculate(self):
        try:
            result = eval(self.display_label.cget("text"))
            self.entry.delete(0, tk.END)
            self.entry.insert(0, str(result))
            self.display_label.config(text=str(result))
            self.last_calculation = True
        except Exception as e:
            self.entry.delete(0, tk.END)
            self.entry.insert(0, "Error")
            self.last_calculation = True

    def set_theme(self, theme):
        self.bg_color = "#FFFFFF" if theme == 'light' else "#333333"
        self.btn_color = "#DDDDDD" if theme == 'light' else "#666666"
        self.entry_color = "#FFFFFF" if theme == 'light' else "#444444"
        self.text_color = "#000000" if theme == 'light' else "#FFFFFF"
        self.apply_theme()

    def apply_theme(self):
        self.master.configure(bg=self.bg_color)
        self.display_label.configure(bg=self.bg_color, fg=self.text_color)
        self.entry.configure(bg=self.entry_color, fg=self.text_color, insertbackground=self.text_color)

    def toggle_theme(self):
        self.theme = 'dark' if self.theme == 'light' else 'light'
        self.set_theme(self.theme)

    def setup_buttons(self):
        buttons = [
            ('7', 2, 0), ('8', 2, 1), ('9', 2, 2),
            ('+', 2, 3), ('sqrt', 2, 4),
            ('4', 3, 0), ('5', 3, 1), ('6', 3, 2),
            ('-', 3, 3), ('^', 3, 4),
            ('1', 4, 0), ('2', 4, 1), ('3', 4, 2),
            ('*', 4, 3), ('C', 4, 4),
            ('0', 5, 0), ('=', 5, 2), ('/', 5, 3),
            ('Toggle Theme', 5, 4)
        ]

        for text, row, col in buttons:
            if text in ['=', 'C', 'Toggle Theme', 'sqrt', '^']:
                if text == '=':
                    command = self.calculate
                elif text == 'C':
                    command = self.clear_entry
                elif text == 'Toggle Theme':
                    command = self.toggle_theme
                elif text == 'sqrt':
                    command = lambda: self.append_to_expression('**0.5')
                elif text == '^':
                    command = lambda: self.append_to_expression('**')
            else:
                command = lambda x=text: self.append_to_expression(x)

            btn = tk.Button(self.master, text=text, command=command, bg=self.btn_color, fg=self.text_color, font=("Arial", 20))
            btn.grid(row=row, column=col, sticky="nsew", padx=1, pady=1)
            btn.bind("<Enter>", lambda e, b=btn: b.configure(bg="#CCCCCC"))
            btn.bind("<Leave>", lambda e, b=btn: b.configure(bg=self.btn_color))

        for i in range(5):
            self.master.grid_columnconfigure(i, weight=1)
        for i in range(6):
            self.master.grid_rowconfigure(i, weight=1)


root = tk.Tk()
app = Calculator(root)
root.mainloop()
