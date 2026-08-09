// gml_Object_honda7_Create_0  locals=2 args=0 len=456
// locals: arguments, __b__
00000000: push.imm.e 1
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 0
00000018: conv.i.v
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.imm.e 736
00000028: conv.i.v
0000002C: call action_if_number(argc=3)
00000034: pop.v.v local.__b__
0000003C: push.local.v local.__b__
00000044: conv.v.b
00000048: bf 0x20AA3A0
0000004C: push.imm.e -26
00000050: conv.i.v
00000054: push.imm.e 21
00000058: conv.i.v
0000005C: call action_move_to(argc=2)
00000064: popz
00000068: push.imm.e 0
0000006C: conv.i.v
00000070: call action_set_relative(argc=1)
00000078: popz
0000007C: push.imm.e 0
00000080: conv.i.v
00000084: push.imm.e 270
00000088: conv.i.v
0000008C: call action_set_alarm(argc=2)
00000094: popz
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: call action_set_relative(argc=1)
000000A8: popz
000000AC: push.imm.e 0
000000B0: conv.i.v
000000B4: call action_set_relative(argc=1)
000000BC: popz
000000C0: push.imm.e 1
000000C4: conv.i.v
000000C8: push.imm.e 289
000000CC: conv.i.v
000000D0: call action_set_alarm(argc=2)
000000D8: popz
000000DC: push.imm.e 1
000000E0: conv.i.v
000000E4: call action_set_relative(argc=1)
000000EC: popz
000000F0: push.imm.e 0
000000F4: conv.i.v
000000F8: call action_set_relative(argc=1)
00000100: popz
00000104: push.imm.e 3
00000108: conv.i.v
0000010C: push.imm.e 330
00000110: conv.i.v
00000114: call action_set_motion(argc=2)
0000011C: popz
00000120: push.imm.e 1
00000124: conv.i.v
00000128: call action_set_relative(argc=1)
00000130: popz
00000134: push.imm.e 455
00000138: pushenv 0x20AA4B0
0000013C: push.imm.e 0
00000140: conv.i.v
00000144: push.imm.e 1
00000148: conv.i.v
0000014C: push.v night
00000154: call action_if_variable(argc=3)
0000015C: pop.v.v local.__b__
00000164: push.local.v local.__b__
0000016C: conv.v.b
00000170: bf 0x20AA4B0
00000174: b 0x20AA4B8
00000178: popenv 0x40AA474
0000017C: b 0x20AA4BC
00000180: popenv 0x1CAA4B8
00000184: push.local.v local.__b__
0000018C: conv.v.b
00000190: bf 0x20AA4EC
00000194: push.imm.e 1
00000198: conv.i.v
0000019C: push.i 16366009
000001A4: conv.i.v
000001A8: call action_sprite_color(argc=2)
000001B0: popz
000001B4: push.imm.e 0
000001B8: conv.i.v
000001BC: call action_set_relative(argc=1)
000001C4: popz