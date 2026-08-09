/// gml_Object_farolux_Step_0
// locals: __b__
with (aura) {
    __b__ = action_if_variable(night, 1, 0);
    if (!__b__) {
        break;
    }
}
if (!__b__) {
    action_kill_object();
}
