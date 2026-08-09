/// gml_Object_faro1_Step_0
// locals: __b__
action_set_relative(0);
__b__ = action_if_variable(trasformato, 0, 0);
if (__b__) {
    with (chies) {
        __b__ = action_if_variable(level, 2, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        trasformato = 2;
        action_set_relative(1);
        action_create_object(upfaro1, 0, 0);
        action_set_relative(0);
    }
}
__b__ = action_if_variable(trasformato, 1, 0);
if (__b__) {
    __b__ = action_if_number(102, 0, 0);
    if (__b__) {
        __b__ = action_if_number(107, 0, 0);
        if (__b__) {
            __b__ = action_if_number(115, 0, 0);
            if (__b__) {
                action_set_relative(1);
                action_create_object(wavesig1, 0, -290);
                action_set_relative(0);
            }
        }
    }
}
action_set_relative(0);
