// gml_Object_mon_bil_Create_0  locals=2 args=0 len=184
// locals: arguments, __b__
00000000: push.imm.e 455
00000004: pushenv 0x20BBB2C
00000008: push.imm.e 0
0000000C: conv.i.v
00000010: push.imm.e 1
00000014: conv.i.v
00000018: push.v night
00000020: call action_if_variable(argc=3)
00000028: pop.v.v local.__b__
00000030: push.local.v local.__b__
00000038: conv.v.b
0000003C: bf 0x20BBB2C
00000040: b 0x20BBB34
00000044: popenv 0x40BBAF0
00000048: b 0x20BBB38
0000004C: popenv 0x1CBBB34
00000050: push.local.v local.__b__
00000058: conv.v.b
0000005C: bf 0x20BBB68
00000060: push.imm.e 1
00000064: conv.i.v
00000068: push.i 16366009
00000070: conv.i.v
00000074: call action_sprite_color(argc=2)
0000007C: popz
00000080: push.imm.e 8
00000084: conv.i.v
00000088: push.imm.e 30
0000008C: conv.i.v
00000090: call action_set_motion(argc=2)
00000098: popz
0000009C: push.imm.e 0
000000A0: conv.i.v
000000A4: push.imm.e 225
000000A8: conv.i.v
000000AC: call action_set_alarm(argc=2)
000000B4: popz