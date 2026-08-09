// gml_Object_tops4s_Create_0  locals=2 args=0 len=312
// locals: arguments, __b__
00000000: push.v y
00000008: neg.v.d
0000000C: push.imm.e 172
00000010: sub.i.v
00000014: pop.v.v depth
0000001C: push.imm.e 455
00000020: pushenv 0x216A77C
00000024: push.imm.e 0
00000028: conv.i.v
0000002C: push.imm.e 1
00000030: conv.i.v
00000034: push.v night
0000003C: call action_if_variable(argc=3)
00000044: pop.v.v local.__b__
0000004C: push.local.v local.__b__
00000054: conv.v.b
00000058: bf 0x216A77C
0000005C: b 0x216A784
00000060: popenv 0x416A740
00000064: b 0x216A788
00000068: popenv 0x1D6A784
0000006C: push.local.v local.__b__
00000074: conv.v.b
00000078: bf 0x216A7B8
0000007C: push.imm.e 1
00000080: conv.i.v
00000084: push.i 16366009
0000008C: conv.i.v
00000090: call action_sprite_color(argc=2)
00000098: popz
0000009C: push.imm.e 455
000000A0: pushenv 0x216A7FC
000000A4: push.imm.e 0
000000A8: conv.i.v
000000AC: push.imm.e 1
000000B0: conv.i.v
000000B4: push.v dawn
000000BC: call action_if_variable(argc=3)
000000C4: pop.v.v local.__b__
000000CC: push.local.v local.__b__
000000D4: conv.v.b
000000D8: bf 0x216A7FC
000000DC: b 0x216A804
000000E0: popenv 0x416A7C0
000000E4: b 0x216A808
000000E8: popenv 0x1D6A804
000000EC: push.local.v local.__b__
000000F4: conv.v.b
000000F8: bf 0x216A838
000000FC: push.imm.e 1
00000100: conv.i.v
00000104: push.i 15201023
0000010C: conv.i.v
00000110: call action_sprite_color(argc=2)
00000118: popz
0000011C: push.imm.e 0
00000120: conv.i.v
00000124: push.imm.e 700
00000128: conv.i.v
0000012C: call action_set_alarm(argc=2)
00000134: popz