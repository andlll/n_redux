// gml_Object_honda_facile_1_Create_0  locals=2 args=0 len=184
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: push.imm.e 900
0000000C: conv.i.v
00000010: call action_set_alarm(argc=2)
00000018: popz
0000001C: push.imm.e 3
00000020: conv.i.v
00000024: push.imm.e 150
00000028: conv.i.v
0000002C: call action_set_motion(argc=2)
00000034: popz
00000038: push.imm.e 455
0000003C: pushenv 0x20A09D4
00000040: push.imm.e 0
00000044: conv.i.v
00000048: push.imm.e 1
0000004C: conv.i.v
00000050: push.v night
00000058: call action_if_variable(argc=3)
00000060: pop.v.v local.__b__
00000068: push.local.v local.__b__
00000070: conv.v.b
00000074: bf 0x20A09D4
00000078: b 0x20A09DC
0000007C: popenv 0x40A0998
00000080: b 0x20A09E0
00000084: popenv 0x1CA09DC
00000088: push.local.v local.__b__
00000090: conv.v.b
00000094: bf 0x20A0A10
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: push.i 16366009
000000A8: conv.i.v
000000AC: call action_sprite_color(argc=2)
000000B4: popz