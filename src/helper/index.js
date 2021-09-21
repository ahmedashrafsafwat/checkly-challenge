/** set of helper functions */
exports.successResponse = (message,data =[], code = 200,res) => res.status(code).send({
    code,
    data,
    message,
  });
  
  exports.errorResponse = (
    message,
    code = 500,
    res
  ) => res.status(code).json({
    code,
    message,
  });
  

  exports.validateFields = (object, fields) => {
    const errors = [];
    fields.forEach((f) => {
      if (!(object && object[f])) {
        errors.push(f);
      }
    });
    return errors.length ? `${errors.join(', ')} are required fields.` : '';
  };
  
exports.isValidDate = (d) =>{
    return d instanceof Date && !isNaN(d);
}