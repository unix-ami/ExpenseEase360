import os
import subprocess
import sys
import signal
import time

def setup_venv():
    """Create virtual environment and install dependencies"""
    subprocess.run([sys.executable, "-m", "venv", "env"])
    if os.name == 'nt':  # for Windows
        subprocess.run(["env\\Scripts\\activate.bat"])
    else:  # for macOS/Linux
        subprocess.run(["source", "env/bin/activate"], shell=True)
    subprocess.run([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])

def run_frontend():
    """Setup frontend"""
    os.chdir('frontend')
    subprocess.run(["npm", "install"])
    subprocess.run(["npm", "run", "dev"])

def run_backend():
    """Setup backend"""
    os.chdir('backend')
    subprocess.run([sys.executable, "manage.py", "runserver"])

def clean_exit(signal, frame):
    """Handle clean exit on signal (Ctrl+C)"""
    print("\nTerminating process...")
    sys.exit(0)

def main():
    # set up signal handling to gracefully handle termination (Ctrl+C)
    signal.signal(signal.SIGINT, clean_exit)

    # check the platform and set up virtual environment
    if sys.platform.startswith('win'):
        print("Running on Windows")
        setup_venv()

    elif sys.platform.startswith('darwin') or sys.platform.startswith('linux'):
        print("Running on macOS/Linux")
        setup_venv()

    else:
        print(f"Unsupported OS: {sys.platform}")
        return

    # ask user whether to run frontend or backend
    choice = input("Do you want to run the frontend or backend? (f/b): ").strip().lower()

    if choice == 'f':
        print("Running frontend...")
        run_frontend()
    elif choice == 'b':
        print("Running backend...")
        run_backend()
    else:
        print("Invalid choice.")

if __name__ == "__main__":
    main()
