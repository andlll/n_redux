// gml_Object_honda_br22_Create_0  locals=2 args=0 len=240
// locals: arguments, __b__
00000000: push.imm.e 1257
00000004: conv.i.v
00000008: push.imm.e 228
0000000C: conv.i.v
00000010: call action_move_to(argc=2)
00000018: popz
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 205
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz
00000038: push.imm.e 1
0000003C: conv.i.v
00000040: push.imm.e 224
00000044: conv.i.v
00000048: call action_set_alarm(argc=2)
00000050: popz
00000054: push.imm.e 3
00000058: conv.i.v
0000005C: push.imm.e 30
00000060: conv.i.v
00000064: call action_set_motion(argc=2)
0000006C: popz
00000070: push.imm.e 455
00000074: pushenv 0x20A9FB0
00000078: push.imm.e 0
0000007C: conv.i.v
00000080: push.imm.e 1
00000084: conv.i.v
00000088: push.v night
00000090: call action_if_variable(argc=3)
00000098: pop.v.v local.__b__
000000A0: push.local.v local.__b__
000000A8: conv.v.b
000000AC: bf 0x20A9FB0
000000B0: b 0x20A9FB8
000000B4: popenv 0x40A9F74
000000B8: b 0x20A9FBC
000000BC: popenv 0x1CA9FB8
000000C0: push.local.v local.__b__
000000C8: conv.v.b
000000CC: bf 0x20A9FEC
000000D0: push.imm.e 1
000000D4: conv.i.v
000000D8: push.i 16366009
000000E0: conv.i.v
000000E4: call action_sprite_color(argc=2)
000000EC: popz