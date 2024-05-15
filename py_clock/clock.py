import tkinter as tk
import time

class Clock(tk.Tk):
    def __init__(self):
        super().__init__()
        self.title("GUI Clock")
        self.geometry("300x100")
        self.resizable(False, False)
        
        # Create canvas for gradient background
        self.canvas = tk.Canvas(self, width=300, height=100)
        self.canvas.pack(fill="both", expand=True)
        
        # Draw gradient background
        self.create_gradient_background(self.canvas, "purple", "blue")

        # Create label with rounded corners and shadow effect
        self.time_label = tk.Label(self, font=('calibri', 40, 'bold'), background='purple', foreground='white')
        self.time_label_window = self.canvas.create_window(150, 50, window=self.time_label)
        
        self.update_clock()

    def create_gradient_background(self, canvas, color1, color2):
        for i in range(100):
            color = self.interpolate_color(color1, color2, i / 100.0)
            canvas.create_line(0, i, 300, i, fill=color)
    
    def interpolate_color(self, color1, color2, t):
        c1 = self.canvas.winfo_rgb(color1)
        c2 = self.canvas.winfo_rgb(color2)
        r = int(c1[0] + (c2[0] - c1[0]) * t)
        g = int(c1[1] + (c2[1] - c1[1]) * t)
        b = int(c1[2] + (c2[2] - c1[2]) * t)
        return f'#{r:04x}{g:04x}{b:04x}'

    def update_clock(self):
        current_time = time.strftime('%H:%M:%S')
        self.time_label.config(text=current_time)
        self.after(1000, self.update_clock)

if __name__ == "__main__":
    clock = Clock()
    clock.mainloop()
