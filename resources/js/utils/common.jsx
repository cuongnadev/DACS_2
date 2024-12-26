import { jsPDF } from "jspdf";
import "../../../public/assets/fonts/Roboto-Regular-normal";
import "../../../public/assets/fonts/Roboto-Regular-bold";
/**
 *
 * @param {number} timestamp
 */

export const formatDate = (currentDate) => {
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    // Định dạng ngày
    const formattedDate = currentDate.toLocaleDateString('en-US', options).replace(/\d+/, function (match) {
        if (match.endsWith('1') && match !== '11') {
            return `${match}st`;
        } else if (match.endsWith('2') && match !== '12') {
            return `${match}nd`;
        } else if (match.endsWith('3') && match !== '13') {
            return `${match}rd`;
        }
        return `${match}th`;
    });
    return formattedDate;    
};

export const exportProfile = (data, role) => {
    const doc = new jsPDF('portrait', 'px', 'a4', 'false');
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const leftWidth = pageWidth * 0.4;

    // left  
    doc.setFillColor(210, 211, 213);
    doc.rect(0, 0, leftWidth, pageHeight, 'F');
    
    doc.setDrawColor(31, 26, 28);
    doc.setLineWidth(1);
    doc.line(leftWidth, 20, leftWidth, pageHeight - 20);
    
    let yOffsetLeft = 20;

    let imagePath = '';
    if (data.imageUrl) {
        imagePath = `/storage/${data.imageUrl}`;
    } else {
        imagePath = `/assets/images/Placeholder.png`;
    }
    doc.addImage(imagePath, 'PNG', 40, yOffsetLeft, 100, 100);
    
    yOffsetLeft += 130;

    doc.setFont("Roboto-Regular", "bold");
    doc.setFontSize(16);
    doc.setTextColor(31, 26, 28);
    doc.text("Thông tin cá nhân", 20, yOffsetLeft);

    yOffsetLeft += 10; 
    doc.setLineWidth(1);
    doc.line(20, yOffsetLeft, leftWidth - 20, yOffsetLeft);

    let personalInfo = [];

    if(role === "Student") {
        personalInfo = [
            { label: "Họ và tên", value: data.name },
            { label: "Ngày sinh", value: data.dob },
            { label: "Nơi sinh", value: data.pob },
            { label: "Giới tính", value: data.sex },
            { label: "CMND/CCCD", value: data.cccd },
            { label: "Ngày cấp CCCD", value: data.cccd_date },
            { label: "Email cá nhân", value: data.personal_email },
            { label: "Điện thoại", value: data.phone },
        ];
    } else {
        personalInfo = [
            { label: "Họ và tên", value: data.name },
            { label: "Ngày sinh", value: data.dob },
            { label: "Nơi sinh", value: data.pob },
            { label: "Giới tính", value: data.sex },
            { label: "Email cá nhân", value: data.personal_email },
            { label: "Điện thoại", value: data.phone },
        ];
    }

    yOffsetLeft += 20;
    personalInfo.forEach((info) => {
        doc.setFont("Roboto-Regular", "normal");
        doc.setFontSize(12);
        doc.text(`${info.label}: ${info.value || "Chưa có thông tin"}`, 20, yOffsetLeft);
        yOffsetLeft += 20;
    });


    // right  
    let rightYOffset = 80;
    let rightXOffset = leftWidth + 20;
    const rightWidth = pageWidth * 0.6;
    
    doc.setFillColor(210, 211, 213);
    doc.rect(leftWidth, 0, rightWidth, pageHeight, 'F');

    doc.setFont("Roboto-Regular", "bold");
    doc.setFontSize(36);
    doc.setTextColor(31, 26, 28);
    const text = "Akademi - 4C";
    const textWidth = doc.getTextWidth(text);
    const xPosition = leftWidth + (rightWidth - textWidth) / 2;
    
    doc.text(text, xPosition, rightYOffset);

    rightYOffset += 40;

    doc.setFont("Roboto-Regular", "bold");
    doc.setFontSize(16);
    doc.setTextColor(31, 26, 28);
    doc.text("Thông tin học vấn / nghề nghiệp", rightXOffset, rightYOffset);

    rightYOffset += 10; 
    doc.setLineWidth(1);
    doc.line(rightXOffset, rightYOffset, pageWidth - 20, rightYOffset);


    let educationInfo = [];
    if (role === "Student") {
        educationInfo = [
            { label: "Ngành", value: data.major },
            { label: "Khoa", value: `${data.start_date?.split('-')[0]} - ${data.end_date?.split('-')[0]}` },
            { label: "Trường", value: "Công nghệ thông tin và Truyền thông Việt - Hàn" },
        ];
    } else {
        educationInfo = [
            { label: "Ngành", value: data.major },
            { label: "Khoa", value: `${data.start_date?.split('-')[0]} - ${data.end_date?.split('-')[0]}` },
            { label: "Trường", value: data.university },
            { label: "Học vị", value: data.degree },
        ];
    }
    rightYOffset += 20;
    educationInfo.forEach((info) => {
        doc.setFont("Roboto-Regular", "normal");
        doc.setFontSize(12);
        doc.setTextColor(31, 26, 28);
        doc.text(`${info.label}: ${info.value || "Chưa có thông tin"}`, rightXOffset, rightYOffset);
        rightYOffset += 20;
    });

    if (role === "Student") {
        rightYOffset += 20;
        doc.setFont("Roboto-Regular", "bold");
        doc.setFontSize(16);
        doc.setTextColor(31, 26, 28);
        doc.text("Thông tin gia đình", rightXOffset, rightYOffset);

        rightYOffset += 10; 
        doc.setLineWidth(1);
        doc.line(rightXOffset, rightYOffset, pageWidth - 20, rightYOffset);

        const familyInfo = [
            { label: "Cha", value: data.father?.name },
            { label: "Mẹ", value: data.mother?.name },
        ];
        rightYOffset += 20;
        familyInfo.forEach((info) => {
            doc.setFont("Roboto-Regular", "normal");
            doc.setFontSize(12);
            doc.setTextColor(31, 26, 28);
            doc.text(`${info.label}: ${info.value || "Chưa có thông tin"}`, rightXOffset, rightYOffset);
            rightYOffset += 20;
        });
    }

    rightYOffset += 20;
    doc.setFont("Roboto-Regular", "bold");
    doc.setFontSize(16);
    doc.setTextColor(31, 26, 28);
    doc.text("Địa chỉ và liên lạc", rightXOffset, rightYOffset);

    rightYOffset += 10; 
    doc.setLineWidth(1);
    doc.line(rightXOffset, rightYOffset, pageWidth - 20, rightYOffset);

    let contactInfo = [];
    if (role === "Student") {
        contactInfo = [
            { label: "Địa chỉ", value: data.address },
            { label: "Zalo", value: data.zalo },
            { label: "Facebook", value: data.facebook },
        ];
    } else {
        contactInfo = [
            { label: "Địa chỉ", value: data.address },
        ];
    }

    rightYOffset += 20;
    contactInfo.forEach((info) => {
        doc.setFont("Roboto-Regular", "normal");
        doc.setFontSize(12);
        doc.setTextColor(0, 0, 0);
        doc.text(`${info.label}: ${info.value || "Chưa có thông tin"}`, rightXOffset, rightYOffset);
        rightYOffset += 20;
    });

    doc.save(`lylich-${data.name?.toLowerCase() || "unknown"}.pdf`);
};


export const exportScore = (scoresData, courseClassName) => {
    const doc = new jsPDF();

    // Tiêu đề
    doc.setFont("Roboto-Regular", "bold");
    doc.setFontSize(18);
    doc.text(`Score Report: ${courseClassName}`, 20, 20);

    // Thông tin chung
    doc.setFont("Roboto-Regular", "normal");
    doc.setFontSize(12);
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 30);

    // Bảng điểm
    let startY = 40;

    // Header
    doc.setFontSize(10);
    doc.text("STT", 20, startY);
    doc.text("Mã SV", 40, startY);
    doc.text("Họ và Tên", 80, startY);
    doc.text("Điểm CC", 120, startY);
    doc.text("Điểm BT", 140, startY);
    doc.text("Điểm GK", 160, startY);
    doc.text("Điểm CK", 180, startY);

    startY += 10;

    scoresData.forEach((element, index) => {
        const { student, attendance, assignment, mid_term, final } = element;
        const { student_code, user } = student;

        doc.text((index + 1).toString(), 20, startY);
        doc.text(student_code, 40, startY);
        doc.text(user.name, 80, startY);
        doc.text((attendance || "").toString(), 120, startY);
        doc.text((assignment || "").toString(), 140, startY);
        doc.text((mid_term || "").toString(), 160, startY);
        doc.text((final || "").toString(), 180, startY);

        startY += 10;

        if (startY > 280) {
            doc.addPage();
            startY = 20;
        }
    });

    // Xuất file
    doc.save(`${courseClassName}_scores_report.pdf`);
};



