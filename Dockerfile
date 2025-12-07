# 1. نستعملو نسخة خفيفة ديال Node.js
FROM node:18-alpine

# 2. نحدد فين غنخدمو داخل الكونتينر
WORKDIR /app

# 3. نكوبيو ملفات الاعتماديات (dependencies)
COPY package*.json ./

# 4. نأنستاليو المكاتب
RUN npm install

# 5. نكوبيو باقي الكود كامل
COPY . .

# 6. نبنيو البروجي (Build) - ضروري لـ Next.js
RUN npm run build

# 7. نحلوا البور 3000
EXPOSE 3000

# 8. الكوموند باش يديماغي السيت
CMD ["npm", "start"]
