// gml_Object_honda_br13_Create_0  locals=2 args=0 len=296
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 1
0000000C: conv.i.v
00000010: push.imm.e 736
00000014: conv.i.v
00000018: call action_if_number(argc=3)
00000020: pop.v.v local.__b__
00000028: push.local.v local.__b__
00000030: conv.v.b
00000034: bf 0x20A825C
00000038: push.imm.e 852
0000003C: conv.i.v
00000040: push.imm.e 1085
00000044: conv.i.v
00000048: call action_move_to(argc=2)
00000050: popz
00000054: push.imm.e 0
00000058: conv.i.v
0000005C: push.imm.e 285
00000060: conv.i.v
00000064: call action_set_alarm(argc=2)
0000006C: popz
00000070: push.imm.e 1
00000074: conv.i.v
00000078: push.imm.e 304
0000007C: conv.i.v
00000080: call action_set_alarm(argc=2)
00000088: popz
0000008C: push.imm.e 3
00000090: conv.i.v
00000094: push.imm.e 210
00000098: conv.i.v
0000009C: call action_set_motion(argc=2)
000000A4: popz
000000A8: push.imm.e 455
000000AC: pushenv 0x20A82F4
000000B0: push.imm.e 0
000000B4: conv.i.v
000000B8: push.imm.e 1
000000BC: conv.i.v
000000C0: push.v night
000000C8: call action_if_variable(argc=3)
000000D0: pop.v.v local.__b__
000000D8: push.local.v local.__b__
000000E0: conv.v.b
000000E4: bf 0x20A82F4
000000E8: b 0x20A82FC
000000EC: popenv 0x40A82B8
000000F0: b 0x20A8300
000000F4: popenv 0x1CA82FC
000000F8: push.local.v local.__b__
00000100: conv.v.b
00000104: bf 0x20A8330
00000108: push.imm.e 1
0000010C: conv.i.v
00000110: push.i 16366009
00000118: conv.i.v
0000011C: call action_sprite_color(argc=2)
00000124: popz