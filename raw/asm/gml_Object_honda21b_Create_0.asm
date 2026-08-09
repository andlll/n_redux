// gml_Object_honda21b_Create_0  locals=2 args=0 len=376
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 70
00000020: conv.i.v
00000024: call action_set_alarm(argc=2)
0000002C: popz
00000030: push.imm.e 1
00000034: conv.i.v
00000038: push.imm.e 99
0000003C: conv.i.v
00000040: call action_set_alarm(argc=2)
00000048: popz
0000004C: push.imm.e 3
00000050: conv.i.v
00000054: push.imm.e 30
00000058: conv.i.v
0000005C: call action_set_motion(argc=2)
00000064: popz
00000068: push.imm.e 455
0000006C: pushenv 0x20AC080
00000070: push.imm.e 0
00000074: conv.i.v
00000078: push.imm.e 1
0000007C: conv.i.v
00000080: push.v night
00000088: call action_if_variable(argc=3)
00000090: pop.v.v local.__b__
00000098: push.local.v local.__b__
000000A0: conv.v.b
000000A4: bf 0x20AC080
000000A8: b 0x20AC088
000000AC: popenv 0x40AC044
000000B0: b 0x20AC08C
000000B4: popenv 0x1CAC088
000000B8: push.local.v local.__b__
000000C0: conv.v.b
000000C4: bf 0x20AC0BC
000000C8: push.imm.e 1
000000CC: conv.i.v
000000D0: push.i 16366009
000000D8: conv.i.v
000000DC: call action_sprite_color(argc=2)
000000E4: popz
000000E8: push.imm.e 0
000000EC: conv.i.v
000000F0: push.imm.e 1
000000F4: conv.i.v
000000F8: push.imm.e 736
000000FC: conv.i.v
00000100: call action_if_number(argc=3)
00000108: pop.v.v local.__b__
00000110: push.local.v local.__b__
00000118: conv.v.b
0000011C: bf 0x20AC138
00000120: push.imm.e 1
00000124: conv.i.v
00000128: call action_set_relative(argc=1)
00000130: popz
00000134: push.imm.e -26
00000138: conv.i.v
0000013C: push.imm.e 21
00000140: conv.i.v
00000144: call action_move_to(argc=2)
0000014C: popz
00000150: push.imm.e 0
00000154: conv.i.v
00000158: call action_set_relative(argc=1)
00000160: popz
00000164: push.imm.e 0
00000168: conv.i.v
0000016C: call action_set_relative(argc=1)
00000174: popz