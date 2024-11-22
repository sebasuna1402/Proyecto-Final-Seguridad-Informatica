import json

def eslint_report_to_html(json_file, output_html):
    try:
        # Cargar el archivo JSON
        with open(json_file, 'r') as f:
            report = json.load(f)
        
        # Comenzar el archivo HTML
        html_content = """
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>ESLint Report</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 20px; }
                table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
                th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
                th { background-color: #f4f4f4; }
                .error { color: red; }
                .warning { color: orange; }
                .info { color: blue; }
            </style>
        </head>
        <body>
        <h1>ESLint Report</h1>
        """
        
        # Generar contenido para cada archivo
        for entry in report:
            html_content += f"""
            <h2>File: {entry['filePath']}</h2>
            <table>
                <tr>
                    <th>Metric</th>
                    <th>Value</th>
                </tr>
                <tr>
                    <td>Errors</td>
                    <td class="error">{entry['errorCount']}</td>
                </tr>
                <tr>
                    <td>Warnings</td>
                    <td class="warning">{entry['warningCount']}</td>
                </tr>
                <tr>
                    <td>Fixable Errors</td>
                    <td>{entry['fixableErrorCount']}</td>
                </tr>
                <tr>
                    <td>Fixable Warnings</td>
                    <td>{entry['fixableWarningCount']}</td>
                </tr>
            </table>
            """
            
            # Mensajes suprimidos
            if entry["suppressedMessages"]:
                html_content += """
                <h3>Suppressed Messages</h3>
                <table>
                    <tr>
                        <th>Rule</th>
                        <th>Message</th>
                        <th>Line</th>
                        <th>Column</th>
                    </tr>
                """
                for msg in entry["suppressedMessages"]:
                    html_content += f"""
                    <tr>
                        <td>{msg['ruleId']}</td>
                        <td>{msg['message']}</td>
                        <td>{msg['line']}</td>
                        <td>{msg['column']}</td>
                    </tr>
                    """
                html_content += "</table>"
            
            # Reglas deprecadas
            if entry["usedDeprecatedRules"]:
                html_content += """
                <h3>Deprecated Rules</h3>
                <table>
                    <tr>
                        <th>Rule</th>
                        <th>Replaced By</th>
                    </tr>
                """
                for rule in entry["usedDeprecatedRules"]:
                    replaced_by = ", ".join(rule["replacedBy"]) if rule["replacedBy"] else "None"
                    html_content += f"""
                    <tr>
                        <td>{rule['ruleId']}</td>
                        <td>{replaced_by}</td>
                    </tr>
                    """
                html_content += "</table>"
        
        # Finalizar el archivo HTML
        html_content += """
        </body>
        </html>
        """
        
        # Guardar el contenido HTML en un archivo
        with open(output_html, 'w') as f:
            f.write(html_content)
        
        print(f"HTML report generated: {output_html}")
    
    except Exception as e:
        print(f"Error generating HTML report: {e}")

# Ruta al archivo JSON y nombre del archivo HTML de salida
eslint_report_path = "eslint-report.json"
output_html_path = "eslint-report.html"

# Convertir el JSON a HTML
eslint_report_to_html(eslint_report_path, output_html_path)
