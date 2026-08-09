/// gml_Object_faro3_Step_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(trasformato, 0, 0);
if (__b__) {
    with (chies) {
        __b__ = action_if_variable(level, 3, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        trasformato = 2;
        action_set_relative(1);
        action_create_object(upfaro3, 0, 0);
        action_set_relative(0);
    }
}
__b__ = action_if_variable(trasformato, 1, 0);
if (__b__) {
    __b__ = action_if_number(117, 0, 0);
    if (__b__) {
        __b__ = action_if_number(102, 0, 0);
        if (__b__) {
            __b__ = action_if_number(109, 0, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(wavesig3, 0, -290);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(0);
