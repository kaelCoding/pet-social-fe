const regex_email = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regex_pass = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
const regex_integer = /^[0-9]+$/
const regex_number = /^[+-]?([0-9]+([.][0-9]*)?|[.][0-9]+)$/;

const g_validation = (obj) => {
	const label = obj.label; // Tên của trường cần validation
	let data = obj.data;       // Dữ liệu cần validation 
	const isNull = obj.isNull;   // Có cho phép để trống không
	const equal = obj.equal;
	const min = obj.min;     // Tối thiểu bao nhiêu
	const max = obj.max;	// Tối đa bao nhiêu
	const type = obj.type;  // EMAIL hay PASSWORD 
	const integer = obj.integer;   // Dữ liệu là kiểu số 
	const number = obj.number;
	const age = obj.age;

	if (data == null || data == undefined) {
		data = "";
	}
	data = data.toString();
	data = data.trim();

	if (!isNull) {
		if (!data || data == "") {
			return label + " không được để trống";
		}
	}

	if (integer) {
		if (isNull) {
			if (!data || data == "") {
				return;
			}
		}
		if (!data.match(regex_integer)) {
			return label + " phải là số nguyên";
		}
		data = parseInt(data);

	}

	if (number) {
		if (isNull) {
			if (!data || data == "") {
				return;
			}
		}
		if (!data.match(regex_number)) {
			return label + " phải là 1 số";
		}
		data = parseFloat(data);
	}

	if (equal) {
		if (number || integer) {
			if (data != equal) {
				return label + " phải bằng " + equal;
			}
		} else {
			if (data.length != equal) {
				return label + " phải chứa " + equal + " ký tự";
			}
		}
	}

	if (max) {
		if (number || integer) {
			if (data.toString().length > max) {
				return label + " phải bé hơn " + max;
			}
		} else {
			if (data.length > max) {
				return label + " phải bé hơn " + max + " ký tự";
			}
		}
	}

	if (min) {
		if (number || integer) {
			if (data.toString().length < min) {
				return label + " phải lớn hơn " + min;
			}
		} else {
			if (data.length < min) {
				return label + " phải lớn hơn " + min + " ký tự";
			}
		}
	}

	if (age) {
		const currentYear = new Date().getFullYear()

		if ((currentYear - data.slice(0, 4)) < age) {
			return "Tuổi phải lớn hơn " + age;
		}
	}

	switch (type) {
		case "EMAIL":
			if (!regex_email.test(data)) {
				return label + " Không đúng định dạng";
			}
			break;
		case "PASSWORD":
			if (!regex_pass.test(data)) {
				return label + " phải chứa ít nhất 8 kí tự, nhiều nhất 32 kí tự . Chứa ít nhất 1 chữ viết hoa, 1 chữ viết thường và 1 số";
			}
			break;
	}
}

export {
	g_validation
}

/**
 * Example: 

const password = ref("");
const errPassword = ref("");
const checkPassword = () => {
	errPassword.value = g_validation({
		label: "Mật khẩu",
		data: password.value,
		type: "PASSWORD"
	});
	if(errPassword.value){
		return false;
	}else{
		return true;
	}
}

const email = ref("");
const errEmail = ref("");
const checkEmail = () => {
	errEmail.value = g_validation({
		label: "Email",
		data: email.value,
		type: "EMAIL"
	});
	if(errEmail.value){
		return false;
	}else{
		return true;
	}
}



 */