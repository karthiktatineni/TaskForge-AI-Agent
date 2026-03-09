import os

def save_project_files(project_id: str, files: list):
    """
    Saves the generated files to a dedicated folder for the project.
    Target: backend/data/projects/{project_id}/...
    """
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    projects_root = os.path.join(base_dir, "projects")
    project_dir = os.path.join(projects_root, project_id)
    
    if not os.path.exists(project_dir):
        os.makedirs(project_dir)
        
    for file_data in files:
        file_path = file_data.get("path", "unnamed_file")
        content = file_data.get("content", "")
        
        # Security: prevent directory traversal
        # Clean the path to be relative to project_dir
        clean_path = os.path.normpath(file_path).lstrip(os.sep).lstrip("/")
        full_path = os.path.join(project_dir, clean_path)
        
        # Ensure subdirectories exist
        file_parent = os.path.dirname(full_path)
        if not os.path.exists(file_parent):
            os.makedirs(file_parent)
            
        try:
            with open(full_path, "w", encoding="utf-8") as f:
                f.write(content)
        except Exception as e:
            print(f"Error saving file {full_path}: {e}")

    return project_dir
