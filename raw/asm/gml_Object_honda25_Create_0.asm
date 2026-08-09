// gml_Object_honda25_Create_0  locals=2 args=0 len=212
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 196
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 1
00000020: conv.i.v
00000024: push.imm.e 215
00000028: conv.i.v
0000002C: call action_set_alarm(argc=2)
00000034: popz
00000038: push.imm.e 3
0000003C: conv.i.v
00000040: push.imm.e 330
00000044: conv.i.v
00000048: call action_set_motion(argc=2)
00000050: popz
00000054: push.imm.e 455
00000058: pushenv 0x20AF17C
0000005C: push.imm.e 0
00000060: conv.i.v
00000064: push.imm.e 1
00000068: conv.i.v
0000006C: push.v night
00000074: call action_if_variable(argc=3)
0000007C: pop.v.v local.__b__
00000084: push.local.v local.__b__
0000008C: conv.v.b
00000090: bf 0x20AF17C
00000094: b 0x20AF184
00000098: popenv 0x40AF140
0000009C: b 0x20AF188
000000A0: popenv 0x1CAF184
000000A4: push.local.v local.__b__
000000AC: conv.v.b
000000B0: bf 0x20AF1B8
000000B4: push.imm.e 1
000000B8: conv.i.v
000000BC: push.i 16366009
000000C4: conv.i.v
000000C8: call action_sprite_color(argc=2)
000000D0: popz