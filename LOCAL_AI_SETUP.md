# Local AI Setup Guide

## 🚀 **Enhance RHIZ with Local AI**

This guide will help you set up local AI processing using Ollama to make RHIZ even more powerful and private.

## 📋 **Prerequisites**

- **macOS, Linux, or Windows** with WSL2
- **8GB+ RAM** (16GB recommended)
- **4GB+ free disk space**
- **Node.js 18+** (already installed)

## 🔧 **Step 1: Install Ollama**

### **macOS:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### **Linux:**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

### **Windows (WSL2):**
```bash
curl -fsSL https://ollama.ai/install.sh | sh
```

## 🤖 **Step 2: Download AI Models**

Open a new terminal and run:

```bash
# Download Llama2 (recommended for RHIZ)
ollama pull llama2

# Download Mistral (alternative, faster)
ollama pull mistral

# Download Code Llama (for technical analysis)
ollama pull codellama
```

## 🎯 **Step 3: Start Ollama**

```bash
# Start Ollama service
ollama serve
```

Keep this terminal running in the background.

## 🌐 **Step 4: Test Local AI**

1. **Start your RHIZ development server:**
   ```bash
   npm run dev
   ```

2. **Open RHIZ in your browser**

3. **Look for the Local AI toggle** in the conversational agent:
   - If Ollama is running, you'll see a toggle button
   - Click it to switch between "☁️ Cloud" and "🤖 Local"

## 🔍 **Step 5: Verify It's Working**

1. **Open browser developer tools** (F12)
2. **Go to Console tab**
3. **Send a message in the conversational agent**
4. **Look for these logs:**
   ```
   Local AI API called with: { text: "...", model: "llama2" }
   Attempting local AI response...
   Local AI response received: ...
   ```

## 🎛️ **Configuration Options**

### **Model Selection**
You can change the AI model by editing `app/api/local-ai/route.ts`:

```typescript
// Change the default model
const { text, context = '', model = 'mistral' } = await request.json()
```

### **Performance Tuning**
Adjust model parameters in the same file:

```typescript
options: {
  temperature: 0.7,    // Lower = more focused, Higher = more creative
  top_p: 0.9,         // Controls response diversity
  max_tokens: 200     // Response length limit
}
```

## 🚨 **Troubleshooting**

### **"Ollama not available" error:**
- Make sure Ollama is running: `ollama serve`
- Check if models are downloaded: `ollama list`
- Verify port 11434 is accessible: `curl http://localhost:11434/api/tags`

### **Slow responses:**
- Use smaller models: `ollama pull mistral:7b`
- Reduce `max_tokens` in configuration
- Close other applications to free up RAM

### **Memory issues:**
- Use smaller models
- Increase system RAM
- Close unnecessary applications

## 🔒 **Privacy Benefits**

With local AI enabled:
- ✅ **No data sent to external APIs**
- ✅ **Complete privacy for sensitive conversations**
- ✅ **No rate limits or usage costs**
- ✅ **Works offline**

## 🎯 **Next Steps**

Once local AI is working, you can:

1. **Train custom models** for relationship intelligence
2. **Add more specialized models** for different tasks
3. **Integrate with local databases** for enhanced privacy
4. **Build custom prompts** for better RHIZ responses

## 📞 **Support**

If you encounter issues:
1. Check the browser console for error messages
2. Verify Ollama is running: `ollama list`
3. Test Ollama directly: `ollama run llama2 "Hello"`
4. Check system resources (CPU, RAM, disk space)

---

**🎉 Congratulations!** You now have a fully local, private version of RHIZ running on your own hardware!
