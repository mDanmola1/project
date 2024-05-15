import tkinter as tk
import time

class Clock(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("GUI Clock")
        self.geometry("300x100")
        self.resizable(False, False)

        self.time_label = tk.Label(self, font=('calibri', 40, 'bold'), background='purple', foreground='white')
        self.time_label.pack(anchor='center')

        self.update_clock()

    def update_clock(self):
        current_time = time.strftime('%H:%M:%S')
        self.time_label.config(text=current_time)
        self.after(1000, self.update_clock)

if __name__ == "__main__":
    clock = Clock()
    clock.mainloop()
