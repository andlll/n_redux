// gml_Object_clublite2_Alarm_2  locals=2 args=0 len=500
// locals: arguments, __b__
00000000: push.imm.e 0
00000004: conv.i.v
00000008: call action_set_relative(argc=1)
00000010: popz
00000014: push.imm.e 455
00000018: pushenv 0x2134C20
0000001C: push.imm.e 0
00000020: conv.i.v
00000024: push.imm.e 1
00000028: conv.i.v
0000002C: push.v night
00000034: call action_if_variable(argc=3)
0000003C: pop.v.v local.__b__
00000044: push.local.v local.__b__
0000004C: conv.v.b
00000050: bf 0x2134C20
00000054: b 0x2134C28
00000058: popenv 0x4134BE4
0000005C: b 0x2134C2C
00000060: popenv 0x1D34C28
00000064: push.local.v local.__b__
0000006C: conv.v.b
00000070: bf 0x2134C58
00000074: push.imm.e 2
00000078: conv.i.v
0000007C: push.imm.e 30
00000080: conv.i.v
00000084: call action_set_alarm(argc=2)
0000008C: popz
00000090: push.imm.e 156
00000094: pushenv 0x2134CA0
00000098: push.imm.e 1
0000009C: conv.i.v
000000A0: call action_set_relative(argc=1)
000000A8: popz
000000AC: push.v ele
000000B4: push.imm.e -20
000000B8: add.i.v
000000BC: pop.v.v ele
000000C4: push.imm.e 0
000000C8: conv.i.v
000000CC: call action_set_relative(argc=1)
000000D4: popz
000000D8: popenv 0x4134C60
000000DC: push.imm.e 2
000000E0: conv.i.v
000000E4: call action_if_dice(argc=1)
000000EC: pop.v.v local.__b__
000000F4: push.local.v local.__b__
000000FC: conv.v.b
00000100: bf 0x2134D3C
00000104: push.imm.e 2
00000108: conv.i.v
0000010C: call action_if_dice(argc=1)
00000114: pop.v.v local.__b__
0000011C: push.local.v local.__b__
00000124: conv.v.b
00000128: bf 0x2134D18
0000012C: push.imm.e 1
00000130: conv.i.v
00000134: push.i 4259584
0000013C: conv.i.v
00000140: call action_sprite_color(argc=2)
00000148: popz
0000014C: b 0x2134D38
00000150: push.imm.e 1
00000154: conv.i.v
00000158: push.i 16744703
00000160: conv.i.v
00000164: call action_sprite_color(argc=2)
0000016C: popz
00000170: b 0x2134DA8
00000174: push.imm.e 2
00000178: conv.i.v
0000017C: call action_if_dice(argc=1)
00000184: pop.v.v local.__b__
0000018C: push.local.v local.__b__
00000194: conv.v.b
00000198: bf 0x2134D88
0000019C: push.imm.e 1
000001A0: conv.i.v
000001A4: push.i 4227327
000001AC: conv.i.v
000001B0: call action_sprite_color(argc=2)
000001B8: popz
000001BC: b 0x2134DA8
000001C0: push.imm.e 1
000001C4: conv.i.v
000001C8: push.i 14200751
000001D0: conv.i.v
000001D4: call action_sprite_color(argc=2)
000001DC: popz
000001E0: push.imm.e 0
000001E4: conv.i.v
000001E8: call action_set_relative(argc=1)
000001F0: popz