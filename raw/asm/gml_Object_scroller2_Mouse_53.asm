// gml_Object_scroller2_Mouse_53  locals=2 args=0 len=84
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 4
0000000C: conv.i.v
00000010: push.builtin.v os_type
00000018: call action_if_variable(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20C15C4
00000038: push.builtin.v mouse_y
00000040: push.builtin.v mouse_x
00000048: call action_move_to(argc=2)
00000050: popz