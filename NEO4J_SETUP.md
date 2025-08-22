# Neo4j Graph Database Setup Guide

## 🧠 **Real Network Intelligence with Neo4j**

This guide will help you set up Neo4j to enable real network analysis in RHIZ. Neo4j is a powerful graph database that will allow us to perform actual network intelligence calculations, relationship mapping, and strategic insights.

## 📋 **Prerequisites**

- Docker (recommended) or Neo4j Desktop
- At least 4GB RAM available
- 2GB free disk space

## 🚀 **Quick Setup with Docker (Recommended)**

### 1. Install Docker
If you don't have Docker installed:
- **macOS**: Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Windows**: Download from [docker.com](https://www.docker.com/products/docker-desktop)
- **Linux**: Follow [Docker installation guide](https://docs.docker.com/engine/install/)

### 2. Start Neo4j Container
```bash
# Pull and run Neo4j container
docker run \
  --name neo4j-rhiz \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -e NEO4J_PLUGINS='["apoc"]' \
  -v neo4j-data:/data \
  -v neo4j-logs:/logs \
  -v neo4j-import:/var/lib/neo4j/import \
  -v neo4j-plugins:/plugins \
  --restart unless-stopped \
  neo4j:5.15-community
```

### 3. Verify Installation
- Open browser: http://localhost:7474
- Login with: `neo4j` / `password`
- You should see the Neo4j Browser interface

## 🖥️ **Alternative: Neo4j Desktop**

### 1. Download Neo4j Desktop
- Visit [neo4j.com/download](https://neo4j.com/download/)
- Download Neo4j Desktop for your OS
- Install and launch

### 2. Create New Database
1. Click "New" → "Create a Local Graph"
2. Name: `rhiz-network`
3. Password: `password`
4. Version: Neo4j 5.15
5. Click "Create"

### 3. Start Database
- Click "Start" on your new database
- Wait for status to show "Started"

## 🔧 **Configuration**

### 1. Install APOC Plugin (Required)
APOC provides advanced graph algorithms and procedures.

**Docker (already included in command above):**
- APOC is automatically installed

**Neo4j Desktop:**
1. Go to "Plugins" tab
2. Search for "APOC"
3. Click "Install"
4. Restart database

### 2. Configure Memory Settings
For better performance, adjust Neo4j settings:

**Docker:**
```bash
# Stop container
docker stop neo4j-rhiz

# Update with memory settings
docker run \
  --name neo4j-rhiz \
  -p 7474:7474 -p 7687:7687 \
  -e NEO4J_AUTH=neo4j/password \
  -e NEO4J_PLUGINS='["apoc"]' \
  -e NEO4J_dbms_memory_heap_initial__size=1G \
  -e NEO4J_dbms_memory_heap_max__size=2G \
  -e NEO4J_dbms_memory_pagecache_size=1G \
  -v neo4j-data:/data \
  -v neo4j-logs:/logs \
  -v neo4j-import:/var/lib/neo4j/import \
  -v neo4j-plugins:/plugins \
  --restart unless-stopped \
  neo4j:5.15-community
```

**Neo4j Desktop:**
1. Go to "Settings" tab
2. Add these settings:
   ```
   dbms.memory.heap.initial_size=1G
   dbms.memory.heap.max_size=2G
   dbms.memory.pagecache.size=1G
   ```
3. Restart database

## 📊 **Load Sample Data**

### 1. Access Neo4j Browser
- Open http://localhost:7474
- Login: `neo4j` / `password`

### 2. Create Sample Network
Run this Cypher query to create a sample professional network:

```cypher
// Clear existing data
MATCH (n) DETACH DELETE n;

// Create sample companies
CREATE (google:Company {name: 'Google', industry: 'Technology'})
CREATE (microsoft:Company {name: 'Microsoft', industry: 'Technology'})
CREATE (apple:Company {name: 'Apple', industry: 'Technology'})
CREATE (amazon:Company {name: 'Amazon', industry: 'Technology'})
CREATE (meta:Company {name: 'Meta', industry: 'Technology'})
CREATE (netflix:Company {name: 'Netflix', industry: 'Entertainment'})
CREATE (tesla:Company {name: 'Tesla', industry: 'Automotive'})
CREATE (spacex:Company {name: 'SpaceX', industry: 'Aerospace'});

// Create sample people
CREATE (john:Person {name: 'John Smith', title: 'Software Engineer', value: 150000, connections: 847})
CREATE (sarah:Person {name: 'Sarah Johnson', title: 'Product Manager', value: 180000, connections: 623})
CREATE (mike:Person {name: 'Mike Chen', title: 'Data Scientist', value: 160000, connections: 445})
CREATE (emma:Person {name: 'Emma Wilson', title: 'UX Designer', value: 140000, connections: 567})
CREATE (david:Person {name: 'David Brown', title: 'DevOps Engineer', value: 155000, connections: 389})
CREATE (lisa:Person {name: 'Lisa Garcia', title: 'Marketing Director', value: 170000, connections: 892})
CREATE (alex:Person {name: 'Alex Kim', title: 'Business Analyst', value: 135000, connections: 334})
CREATE (rachel:Person {name: 'Rachel Lee', title: 'Sales Manager', value: 145000, connections: 678});

// Create skills
CREATE (js:Skill {name: 'JavaScript'})
CREATE (python:Skill {name: 'Python'})
CREATE (react:Skill {name: 'React'})
CREATE (nodejs:Skill {name: 'Node.js'})
CREATE (aws:Skill {name: 'AWS'})
CREATE (ml:Skill {name: 'Machine Learning'})
CREATE (data:Skill {name: 'Data Science'})
CREATE (product:Skill {name: 'Product Management'})
CREATE (ux:Skill {name: 'UX Design'})
CREATE (devops:Skill {name: 'DevOps'})
CREATE (marketing:Skill {name: 'Digital Marketing'})
CREATE (sales:Skill {name: 'Sales Strategy'})
CREATE (analytics:Skill {name: 'Business Analytics'});

// Connect people to companies
CREATE (john)-[:WORKS_AT]->(google)
CREATE (sarah)-[:WORKS_AT]->(microsoft)
CREATE (mike)-[:WORKS_AT]->(apple)
CREATE (emma)-[:WORKS_AT]->(amazon)
CREATE (david)-[:WORKS_AT]->(meta)
CREATE (lisa)-[:WORKS_AT]->(netflix)
CREATE (alex)-[:WORKS_AT]->(tesla)
CREATE (rachel)-[:WORKS_AT]->(spacex);

// Connect people to skills
CREATE (john)-[:HAS_SKILL]->(js)
CREATE (john)-[:HAS_SKILL]->(react)
CREATE (john)-[:HAS_SKILL]->(nodejs)
CREATE (sarah)-[:HAS_SKILL]->(product)
CREATE (sarah)-[:HAS_SKILL]->(analytics)
CREATE (mike)-[:HAS_SKILL]->(python)
CREATE (mike)-[:HAS_SKILL]->(ml)
CREATE (mike)-[:HAS_SKILL]->(data)
CREATE (emma)-[:HAS_SKILL]->(ux)
CREATE (emma)-[:HAS_SKILL]->(react)
CREATE (david)-[:HAS_SKILL]->(devops)
CREATE (david)-[:HAS_SKILL]->(aws)
CREATE (lisa)-[:HAS_SKILL]->(marketing)
CREATE (lisa)-[:HAS_SKILL]->(analytics)
CREATE (alex)-[:HAS_SKILL]->(analytics)
CREATE (alex)-[:HAS_SKILL]->(python)
CREATE (rachel)-[:HAS_SKILL]->(sales)
CREATE (rachel)-[:HAS_SKILL]->(analytics);

// Create connections between people
CREATE (john)-[:CONNECTED_TO {strength: 0.8}]->(sarah)
CREATE (john)-[:CONNECTED_TO {strength: 0.6}]->(mike)
CREATE (sarah)-[:CONNECTED_TO {strength: 0.7}]->(emma)
CREATE (mike)-[:CONNECTED_TO {strength: 0.9}]->(david)
CREATE (emma)-[:CONNECTED_TO {strength: 0.5}]->(lisa)
CREATE (david)-[:CONNECTED_TO {strength: 0.8}]->(alex)
CREATE (lisa)-[:CONNECTED_TO {strength: 0.6}]->(rachel)
CREATE (alex)-[:CONNECTED_TO {strength: 0.7}]->(john);

// Create reverse connections
CREATE (sarah)-[:CONNECTED_TO {strength: 0.8}]->(john)
CREATE (mike)-[:CONNECTED_TO {strength: 0.6}]->(john)
CREATE (emma)-[:CONNECTED_TO {strength: 0.7}]->(sarah)
CREATE (david)-[:CONNECTED_TO {strength: 0.9}]->(mike)
CREATE (lisa)-[:CONNECTED_TO {strength: 0.5}]->(emma)
CREATE (alex)-[:CONNECTED_TO {strength: 0.8}]->(david)
CREATE (rachel)-[:CONNECTED_TO {strength: 0.6}]->(lisa)
CREATE (john)-[:CONNECTED_TO {strength: 0.7}]->(alex);
```

### 3. Verify Data
Run this query to see your network:

```cypher
MATCH (p:Person)-[:WORKS_AT]->(c:Company)
RETURN p.name, p.title, c.name, c.industry
ORDER BY p.name;
```

## 🧪 **Test in RHIZ**

### 1. Start RHIZ Development Server
```bash
npm run dev
```

### 2. Test Network Analysis
1. Go to the Network Intelligence Demo
2. Enter a LinkedIn URL or use example profiles
3. Toggle "🧠 Real AI" to enable real network analysis
4. Click "Analyze My Network"
5. Check browser console for analysis results

### 3. Verify API Connection
The network analysis API will:
- Check if Neo4j is running on localhost:7474
- Perform real graph queries if available
- Fall back to enhanced mock analysis if Neo4j is not available

## 🔍 **Advanced Queries**

### Network Density Analysis
```cypher
MATCH (p:Person)-[:CONNECTED_TO]-(p2:Person)
WITH count(*) as connections, count(DISTINCT p) as people
RETURN connections, people, 
       round(100.0 * connections / (people * (people - 1))) as density_percent;
```

### Skill Gap Analysis
```cypher
MATCH (p:Person)-[:HAS_SKILL]->(s:Skill)
WITH s.name as skill, count(p) as count
ORDER BY count DESC
RETURN skill, count;
```

### High-Value Connections
```cypher
MATCH (p:Person)
WHERE p.value > 150000
RETURN p.name, p.title, p.value
ORDER BY p.value DESC;
```

## 🛠️ **Troubleshooting**

### Neo4j Not Starting
```bash
# Check if port is in use
lsof -i :7474
lsof -i :7687

# Kill process if needed
kill -9 <PID>

# Restart container
docker restart neo4j-rhiz
```

### Connection Refused
- Ensure Neo4j is running: http://localhost:7474
- Check firewall settings
- Verify Docker container is running: `docker ps`

### Memory Issues
- Increase Docker memory allocation
- Reduce Neo4j memory settings
- Restart container with new settings

### APOC Plugin Issues
```cypher
// Check if APOC is installed
CALL dbms.procedures() YIELD name
WHERE name STARTS WITH 'apoc'
RETURN name;
```

## 📈 **Performance Optimization**

### 1. Index Creation
```cypher
// Create indexes for better performance
CREATE INDEX person_name_index FOR (p:Person) ON (p.name);
CREATE INDEX company_name_index FOR (c:Company) ON (c.name);
CREATE INDEX skill_name_index FOR (s:Skill) ON (s.name);
```

### 2. Constraint Creation
```cypher
// Create constraints for data integrity
CREATE CONSTRAINT person_name_unique FOR (p:Person) REQUIRE p.name IS UNIQUE;
CREATE CONSTRAINT company_name_unique FOR (c:Company) REQUIRE c.name IS UNIQUE;
```

### 3. Memory Tuning
For production use, adjust memory settings based on your data size:
- Small dataset (< 1M nodes): 1-2GB heap
- Medium dataset (1-10M nodes): 4-8GB heap
- Large dataset (> 10M nodes): 16GB+ heap

## 🔄 **Next Steps**

Once Neo4j is running:

1. **Test Basic Functionality**: Verify network analysis works
2. **Load Real Data**: Import actual LinkedIn connections
3. **Custom Queries**: Create domain-specific analysis
4. **Performance Tuning**: Optimize for your data size
5. **Production Deployment**: Set up Neo4j in production environment

## 📞 **Support**

If you encounter issues:
1. Check Neo4j logs: `docker logs neo4j-rhiz`
2. Verify API connectivity: http://localhost:7474
3. Test with simple queries in Neo4j Browser
4. Check RHIZ console for error messages

---

**🎯 Goal**: Enable real network intelligence with graph database analysis while maintaining fallback to mock systems for reliability.
