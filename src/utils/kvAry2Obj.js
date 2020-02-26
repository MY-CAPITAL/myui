export default ary => ary.reduce((obj, [key, value]) => ({...obj, [key]: value}), {})
