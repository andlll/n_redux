/// gml_Object_impa33f_Alarm_0
// locals: __b__
__b__ = action_if_variable(demos, 0, 0);
if (__b__) {
    action_set_alarm(24, 0);
    if (phase == 1) {
        sprite_index = 130;
        phase = phase + 1;
        exit;
    }
    if (phase == 2) {
        sprite_index = 128;
        phase = phase + 1;
        exit;
    }
    if (phase == 3) {
        sprite_index = 126;
        phase = phase + 1;
        exit;
    }
    if (phase == 4) {
        sprite_index = 124;
        phase = phase + 1;
        exit;
    }
    if (phase == 5) {
        sprite_index = 122;
        phase = phase + 1;
        exit;
    }
    if (phase == 6) {
        sprite_index = 120;
        phase = phase + 1;
        exit;
    }
    if (phase == 7) {
        sprite_index = 118;
        phase = phase + 1;
        exit;
    }
    if (phase == 8) {
        sprite_index = 116;
        phase = phase + 1;
        exit;
    }
    if (phase == 9) {
        sprite_index = 114;
        phase = phase + 1;
        exit;
    }
    if (phase == 10) {
        sprite_index = 112;
        phase = phase + 1;
        exit;
    }
    if (phase == 11) {
        sprite_index = 110;
        phase = phase + 1;
        exit;
    }
    if (phase == 12) {
        sprite_index = 108;
        phase = phase + 1;
        exit;
    }
    if (phase == 13) {
        sprite_index = 106;
        phase = phase + 1;
        exit;
    }
    if (phase == 14) {
        sprite_index = 104;
        phase = phase + 1;
        exit;
    }
    if (phase == 15) {
        sprite_index = 102;
        phase = phase + 1;
        exit;
    }
    if (phase == 16) {
        sprite_index = 100;
        phase = phase + 1;
        exit;
    }
    if (phase == 17) {
        sprite_index = 98;
        phase = phase + 1;
        exit;
    }
    if (phase == 18) {
        sprite_index = 96;
        phase = phase + 1;
        exit;
    }
    __b__ = action_if_variable(phase, 19, 0);
    if (__b__) {
        action_set_alarm(2400, 1);
        demos = 1;
    }
}
with (r12) {
    __b__ = action_if_variable(ele, -1000, 2);
    if (__b__) {
        break;
    }
}
if (__b__) {
    with (r12) {
        __b__ = action_if_variable(mon, -1000, 2);
        if (__b__) {
            break;
        }
    }
    if (__b__) {
    }
}
