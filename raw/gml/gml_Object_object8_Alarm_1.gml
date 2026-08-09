/// gml_Object_object8_Alarm_1
// locals: __b__
__b__ = action_if_number(455, 0, 2);
if (__b__) {
    with (aura) {
        __b__ = action_if_variable(dawn, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_color(15201023, 1);
    }
    with (aura) {
        __b__ = action_if_variable(night, 1, 0);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
        action_sprite_color(16366009, 1);
    }
}
